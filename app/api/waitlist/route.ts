import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Check if email already exists
    const existing = await db.collection('waitlist').findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: 'Email already on waitlist' },
        { status: 200 }
      );
    }

    await db.collection('waitlist').insertOne({
      email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
