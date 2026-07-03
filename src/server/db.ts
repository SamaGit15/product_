import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalCache.mongooseCache ?? { conn: null, promise: null };
globalCache.mongooseCache = cache;

export async function dbConnect() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not configured.');
    }

    cache.promise = mongoose.connect(mongoUri, {
      bufferCommands: false
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
