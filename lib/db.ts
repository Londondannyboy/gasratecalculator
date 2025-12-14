import { neon } from '@neondatabase/serverless'

export function createDbQuery() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(connectionString)
}

export const SITE_ID = 'yoga-teacher-insurance'
