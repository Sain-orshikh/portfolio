import { NextResponse } from 'next/server';
import { GitHubClient } from '@/lib/github';
import { z } from 'zod';
import type { Experience } from '@/src/types';

const ExperienceSchema = z.object({
  id: z.string(),
  role: z.string().min(1),
  company: z.string().min(1),
  period: z.string().min(1),
  description: z.string().min(1),
  achievements: z.array(z.string()),
  tech: z.array(z.string()),
  type: z.enum(['paid', 'unpaid', 'school', 'personal']),
  link: z.string().optional(),
});

// Helper to extract and parse the experiences array from TypeScript file
function parseExperiencesFile(content: string): Experience[] {
  const match = content.match(/export const experiences: Experience\[\] = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse experiences array');
  
  const jsonStr = match[1]
    .replace(/'/g, '"')
    .replace(/,(\s*[}\]])/g, '$1');
  
  return JSON.parse(jsonStr);
}

// Helper to reconstruct TypeScript file from experiences array
function buildExperiencesFile(experiences: Experience[]): string {
  const experiencesStr = JSON.stringify(experiences, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")
    .replace(/'(paid|unpaid|school|personal)'/g, "'$1'"); // Keep type values as strings
  
  return `import type { Experience } from '../types';

export const experiences: Experience[] = ${experiencesStr};
`;
}

// GET - Read all experiences
export async function GET() {
  try {
    const github = new GitHubClient();
    const file = await github.getFile('src/data/experiences.ts');
    const content = github.decodeContent(file.content);
    const experiences = parseExperiencesFile(content);

    return NextResponse.json({ experiences, sha: file.sha });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newExperience = ExperienceSchema.parse(body);

    const github = new GitHubClient();
    const file = await github.getFile('src/data/experiences.ts');
    const content = github.decodeContent(file.content);
    const experiences = parseExperiencesFile(content);

    experiences.push(newExperience);

    const newContent = buildExperiencesFile(experiences);
    await github.updateFile(
      'src/data/experiences.ts',
      newContent,
      `Add experience: ${newExperience.role} at ${newExperience.company}`,
      file.sha
    );

    return NextResponse.json({ success: true, experience: newExperience });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create experience' },
      { status: 500 }
    );
  }
}

// PUT - Update existing experience
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedExperience = ExperienceSchema.parse(body);

    const github = new GitHubClient();
    const file = await github.getFile('src/data/experiences.ts');
    const content = github.decodeContent(file.content);
    const experiences = parseExperiencesFile(content);

    const index = experiences.findIndex(e => e.id === updatedExperience.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    experiences[index] = updatedExperience;

    const newContent = buildExperiencesFile(experiences);
    await github.updateFile(
      'src/data/experiences.ts',
      newContent,
      `Update experience: ${updatedExperience.role} at ${updatedExperience.company}`,
      file.sha
    );

    return NextResponse.json({ success: true, experience: updatedExperience });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update experience' },
      { status: 500 }
    );
  }
}

// DELETE - Remove experience
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Experience ID required' },
        { status: 400 }
      );
    }

    const github = new GitHubClient();
    const file = await github.getFile('src/data/experiences.ts');
    const content = github.decodeContent(file.content);
    const experiences = parseExperiencesFile(content);

    const filtered = experiences.filter(e => e.id !== id);
    if (filtered.length === experiences.length) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    const newContent = buildExperiencesFile(filtered);
    await github.updateFile(
      'src/data/experiences.ts',
      newContent,
      `Delete experience: ${id}`,
      file.sha
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
