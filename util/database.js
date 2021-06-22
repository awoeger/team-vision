import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();
