import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.createdAt = Date.now();
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ success: true });
}
