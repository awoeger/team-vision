import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
// import setPostgresDefaultsOnHeroku from '../setPostgresDefaultsOnHeroku';
import { Session, User, UserWithPasswordHash } from '../util/types';

// setPostgresDefaultsOnHeroku();

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Perform a first query

export async function insertUser({
  firstName,
  lastName,
  email,
  username,
  userPasswordHash,
  roleId,
}: UserWithPasswordHash) {
  const users = await sql`
    INSERT INTO users
    -- column names
      (user_first_name, user_last_name, username, user_email, user_password_hash, user_role_id)
    VALUES
      (${firstName}, ${lastName}, ${username}, ${email}, ${userPasswordHash}, ${roleId})
    RETURNING
      id,
      user_first_name,
      user_last_name,
      username,
      user_email,
      user_role_id
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserById(id?: number) {
  // Return undefined if userId is not parseable
  // to an integer
  if (!id) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      user_first_name,
      user_last_name,
      username,
      user_email
      user_role_id
    FROM
      users
    WHERE
      id = ${id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserByUsernameAndToken(
  username?: string,
  token?: string,
) {
  console.log('u', username);
  console.log('t', token);

  // Return undefined if username is falsy
  if (!username || !token) return undefined;
  console.log('here');

  const userFromSession = await getUserByValidSessionToken(token);
  console.log('session', userFromSession);

  const users = await sql<[User]>`
    SELECT
      id,
      user_first_name,
      user_last_name,
      username,
      user_email
      user_role_id
    FROM
      users
    WHERE
      username = ${username} AND
      id = ${userFromSession.id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserWithPasswordHashByUsername(username?: string) {
  // Return undefined if username is falsy
  if (!username) return undefined;

  const users = await sql<[UserWithPasswordHash]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const sessions = await sql<Session[]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry > NOW()
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const session = await getValidSessionByToken(token);

  if (!session) return undefined;

  return await getUserById(session.userId);
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
    -- column names
      (token, users_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
     sessions
    WHERE expiry < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}
