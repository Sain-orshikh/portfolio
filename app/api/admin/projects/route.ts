import { NextResponse } from 'next/server';
import { GitHubClient } from '@/lib/github';
import { z } from 'zod';
import type { Project } from '@/src/types';

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()),
  repo: z.string().optional(),
  demo: z.string().optional(),
  image: z.string().optional(),
});

// Helper to extract and parse the projects array from TypeScript file
function parseProjectsFile(content: string): Project[] {
  const match = content.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('Could not parse projects array');
  
  // Replace single quotes with double quotes for valid JSON
  const jsonStr = match[1]
    .replace(/'/g, '"')
    .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
  
  return JSON.parse(jsonStr);
}

// Helper to reconstruct TypeScript file from projects array
function buildProjectsFile(projects: Project[]): string {
  const projectsStr = JSON.stringify(projects, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .replace(/"/g, "'"); // Use single quotes
  
  return `import type { Project } from '../types';

export const projects: Project[] = ${projectsStr};
`;
}

// GET - Read all projects
export async function GET() {
  try {
    const github = new GitHubClient();
    const file = await github.getFile('src/data/projects.ts');
    const content = github.decodeContent(file.content);
    const projects = parseProjectsFile(content);

    return NextResponse.json({ projects, sha: file.sha });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProject = ProjectSchema.parse(body);

    const github = new GitHubClient();
    const file = await github.getFile('src/data/projects.ts');
    const content = github.decodeContent(file.content);
    const projects = parseProjectsFile(content);

    // Add new project
    projects.push(newProject);

    const newContent = buildProjectsFile(projects);
    await github.updateFile(
      'src/data/projects.ts',
      newContent,
      `Add project: ${newProject.title}`,
      file.sha
    );

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT - Update existing project
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedProject = ProjectSchema.parse(body);

    const github = new GitHubClient();
    const file = await github.getFile('src/data/projects.ts');
    const content = github.decodeContent(file.content);
    const projects = parseProjectsFile(content);

    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    projects[index] = updatedProject;

    const newContent = buildProjectsFile(projects);
    await github.updateFile(
      'src/data/projects.ts',
      newContent,
      `Update project: ${updatedProject.title}`,
      file.sha
    );

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Remove project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID required' },
        { status: 400 }
      );
    }

    const github = new GitHubClient();
    const file = await github.getFile('src/data/projects.ts');
    const content = github.decodeContent(file.content);
    const projects = parseProjectsFile(content);

    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === projects.length) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const newContent = buildProjectsFile(filtered);
    await github.updateFile(
      'src/data/projects.ts',
      newContent,
      `Delete project: ${id}`,
      file.sha
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}
