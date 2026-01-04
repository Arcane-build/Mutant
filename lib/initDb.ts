/**
 * Database initialization script
 * Run this once to set up indexes and collections
 */
import { connectToDatabase } from './mongodb';

export async function initializeDatabase() {
  try {
    const { db } = await connectToDatabase();
    
    // Create waitlist collection if it doesn't exist
    const collections = await db.listCollections({ name: 'waitlist' }).toArray();
    
    if (collections.length === 0) {
      await db.createCollection('waitlist');
      console.log('✅ Waitlist collection created');
    }
    
    // Create unique index on email to prevent duplicates
    await db.collection('waitlist').createIndex(
      { email: 1 },
      { unique: true, name: 'email_unique_index' }
    );
    console.log('✅ Unique index on email created');
    
    // Create index on createdAt for sorting
    await db.collection('waitlist').createIndex(
      { createdAt: -1 },
      { name: 'created_at_index' }
    );
    console.log('✅ Index on createdAt created');
    
    console.log('✅ Database initialization completed successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
