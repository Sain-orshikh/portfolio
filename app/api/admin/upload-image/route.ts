import { NextResponse } from 'next/server';
import { GitHubClient } from '@/lib/github';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported: jpg, png, webp, gif' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 5MB' },
        { status: 400 }
      );
    }

    // Generate filename with timestamp to avoid conflicts
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const sanitizedName = file.name
      .split('.')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .substring(0, 30);
    const filename = `${sanitizedName}-${timestamp}.${extension}`;
    const path = `public/${filename}`;

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Content = buffer.toString('base64');

    // Upload to GitHub
    const github = new GitHubClient();
    
    // Check if file already exists (shouldn't happen with timestamp, but just in case)
    let fileSha = '';
    try {
      const existingFile = await github.getFile(path);
      fileSha = existingFile.sha;
    } catch (error) {
      // File doesn't exist, which is expected
    }

    await github.updateFile(
      path,
      base64Content,
      `Upload image: ${filename}`,
      fileSha,
      true // Content is already base64 encoded
    );

    console.log(`Successfully uploaded image to GitHub: ${path}`);
    console.log(`Image will be accessible at: /${filename}`);

    // Return the path that will be used in the project
    const imagePath = `/${filename}`;

    return NextResponse.json({ 
      success: true, 
      path: imagePath,
      filename,
      githubPath: path
    });
  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
