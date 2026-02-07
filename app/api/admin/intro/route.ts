import { NextResponse } from 'next/server';
import { GitHubClient } from '@/lib/github';
import { z } from 'zod';

const IntroTextSchema = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)),
  learning: z.string().min(1),
});

// Helper to extract and parse the intro text from TypeScript file
function parseIntroFile(content: string): any {
  const match = content.match(/export const introText = ({[\s\S]*?});/);
  if (!match) throw new Error('Could not parse intro text');
  
  let jsonStr = match[1];
  
  // Extract strings FIRST before removing comments
  const strings: string[] = [];
  let index = 0;
  
  // Match both single and double quoted strings (with proper escape handling)
  const stringPattern = /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/g;
  
  // Extract all strings and replace them with placeholders
  jsonStr = jsonStr.replace(stringPattern, (match) => {
    strings.push(match);
    return `__STRING_${index++}__`;
  });
  
  // Remove inline comments
  jsonStr = jsonStr.replace(/\/\/[^\n]*/g, '');
  
  // Remove trailing commas
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  
  // Add quotes around property names (id: → "id":)
  jsonStr = jsonStr.replace(/(\w+):/g, '"$1":');
  
  // Restore strings with double quotes
  index = 0;
  jsonStr = jsonStr.replace(/__STRING_(\d+)__/g, () => {
    const str = strings[index++];
    const quote = str[0];
    const textContent = str.slice(1, -1);
    
    // If it was single-quoted, convert to double quotes and handle escapes
    if (quote === "'") {
      return '"' + textContent.replace(/\\'/g, "'").replace(/"/g, '\\"') + '"';
    }
    // If already double-quoted, keep as is
    return str;
  });
  
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse JSON:', jsonStr);
    throw new Error('Failed to parse intro file');
  }
}

// Helper to reconstruct TypeScript file from intro text
function buildIntroFile(introData: any): string {
  const introStr = JSON.stringify(introData, null, 2)
    .replace(/"(\w+)":/g, '$1:'); // Remove quotes from object keys only
  
  return `export const introText = ${introStr};
`;
}

// GET - Read intro text
export async function GET() {
  try {
    const github = new GitHubClient();
    const file = await github.getFile('src/data/intro.ts');
    const content = github.decodeContent(file.content);
    const introText = parseIntroFile(content);

    return NextResponse.json({ introText, sha: file.sha });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch intro text' },
      { status: 500 }
    );
  }
}

// PUT - Update intro text
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedIntro = IntroTextSchema.parse(body);

    const github = new GitHubClient();
    const file = await github.getFile('src/data/intro.ts');
    const content = github.decodeContent(file.content);

    const newContent = buildIntroFile(updatedIntro);
    await github.updateFile(
      'src/data/intro.ts',
      newContent,
      'Update homepage introduction text',
      file.sha
    );

    return NextResponse.json({ success: true, introText: updatedIntro });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update intro text' },
      { status: 500 }
    );
  }
}
