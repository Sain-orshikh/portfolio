import { NextResponse } from 'next/server';
import { GitHubClient } from '@/lib/github';
import { z } from 'zod';

const BirthdayConfigSchema = z.object({
  friendName: z.string().min(1),
  oldVersion: z.string().min(1),
  newVersion: z.string().min(1),
});

// Helper to extract and parse the birthday config from TypeScript file
function parseBirthdayConfigFile(content: string): any {
  const match = content.match(/export const birthdayConfig = ({[\s\S]*?});/);
  if (!match) throw new Error('Could not parse birthday config');
  
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
    throw new Error('Failed to parse birthday config file');
  }
}

// Helper to reconstruct TypeScript file from birthday config
function buildBirthdayConfigFile(configData: any): string {
  const configStr = JSON.stringify(configData, null, 2)
    .replace(/"(\w+)":/g, '$1:'); // Remove quotes from object keys only
  
  return `export const birthdayConfig = ${configStr};
`;
}

// GET - Read birthday config
export async function GET() {
  try {
    const github = new GitHubClient();
    const file = await github.getFile('src/data/birthday-config.ts');
    const content = github.decodeContent(file.content);
    const birthdayConfig = parseBirthdayConfigFile(content);

    return NextResponse.json({ birthdayConfig, sha: file.sha });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch birthday config' },
      { status: 500 }
    );
  }
}

// PUT - Update birthday config
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedConfig = BirthdayConfigSchema.parse(body);

    const github = new GitHubClient();
    const file = await github.getFile('src/data/birthday-config.ts');
    const content = github.decodeContent(file.content);

    const newContent = buildBirthdayConfigFile(updatedConfig);
    await github.updateFile(
      'src/data/birthday-config.ts',
      newContent,
      'Update birthday configuration',
      file.sha
    );

    return NextResponse.json({ success: true, birthdayConfig: updatedConfig });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update birthday config' },
      { status: 500 }
    );
  }
}
