import mongoose from 'mongoose';

export default class Database {
  url: string = process.env.MONGO_URI || ' ';

  constructor() {
    console.log('DATABASE URL:', this.url);
  }

  connect() {
    return mongoose.connect(this.url, (error) => {
      if (error) {
        console.log('MongoDB Connection error:', error);
        process.exit(1);
      }
    });
  }
}

try {
  const db = new Database();
  db.connect();

  console.log('Database connection initialized.');
} catch (error) {
  throw new Error(`DB connection error: ${error}`);
}
