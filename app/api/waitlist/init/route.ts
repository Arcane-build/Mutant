import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/initDb';

/**
 * API endpoint to initialize the database
 * Call this once: POST /api/waitlist/init
 */
export async function POST() {
  try {
    await initializeDatabase();
    return NextResponse.json(
      { message: 'Database initialized successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: (error as Error).message },
      { status: 500 }
    );
  }
}
