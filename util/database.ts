import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
// import setPostgresDefaultsOnHeroku from '../setPostgresDefaultsOnHeroku';
import {
  ApplicationError,
  NewEvent,
  PlayerRequest,
  Session,
  TeamInfo,
  User,
  UserWithPasswordHash,
} from '../util/types';

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
export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      user_first_name,
      user_last_name,
      username,
      user_email,
      user_role_id
    FROM
      users
  `;
  return users.map((user) => camelcaseKeys(user));
}

// Secure version of getUsers which
// allows ANY authenticated user
// to view ALL users
export async function getUsersIfValidSessionToken(token?: string) {
  // Security: Return "Access denied" error if falsy token passed
  if (!token) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  const session = await getValidSessionByToken(token);

  // Security: Return "Access denied" token does not
  // match valid session
  if (!session) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  // Security: Now this query has been protected
  // and it will only run in case the user has a
  // token corresponding to a valid session
  const users = await sql<User[]>`
    SELECT
      id,
      user_first_name,
      user_last_name,
      username,
      user_email,
      user_role_id
    FROM
      users
  `;

  return users.map((user) => camelcaseKeys(user));
}

export async function insertUser({
  userFirstName,
  userLastName,
  userEmail,
  username,
  userPasswordHash,
  userRoleId,
}: UserWithPasswordHash) {
  const users = await sql<[User]>`
    INSERT INTO users
    -- column names
      (user_first_name, user_last_name, username, user_email, user_password_hash, user_role_id)
    VALUES
      (${userFirstName}, ${userLastName}, ${username}, ${userEmail}, ${userPasswordHash}, ${userRoleId})
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

export async function createNewTeam(
  teamName: string,
  sportType: string,
  foundedAt: string,
  usersId: number,
) {
  const teams = await sql<[TeamInfo]>`
  INSERT INTO teams
  --column names
  (team_name, sport_type, founded, coach_user_id)
  VALUES(
    ${teamName},  ${sportType}, ${foundedAt}, ${usersId}
  )
  RETURNING
      team_name,
      sport_type,
      founded,
      coach_user_id
  `;
  return teams.map((team) => camelcaseKeys(team))[0];
}

export async function createPlayerRequest(
  teamChoice: string,
  positionOnTeam: string,
  playingSince: string,
  experienceLevel: string,
  message: string,
  usersId: number,
) {
  const playerRequest = await sql<[PlayerRequest]>`
  INSERT INTO team_user
  --column names
  (users_id, team_id, status_id, position_on_team, playing_since, experience_level, player_message)
  VALUES(
    ${usersId},  ${teamChoice}, 1, ${positionOnTeam}, ${playingSince}, ${experienceLevel}, ${message}
  )
  RETURNING
  -- column names
    users_id, team_id, status_id, position_on_team, playing_since, experience_level, player_message
  `;
  return playerRequest.map((request) => camelcaseKeys(request))[0];
}

// TODO: Check out the date and time types
export async function createNewEvent(
  eventType: string,
  teamId: number,
  startDate: Date,
  endDate: Date,
  meetingTime: string,
  startTime: string,
  endTime: string,
  eventLocation: string,
  eventDescription: string,
) {
  const newEvent = await sql<[NewEvent]>`
  INSERT INTO events
  --column names
  (event_type, team_id, start_day, end_day, start_time, end_time, meeting_time, event_location, event_description)
  VALUES(
    ${eventType},  ${teamId}, ${startDate}, ${endDate}, ${meetingTime}, ${startTime}, ${endTime}, ${eventLocation}, ${eventDescription}
  )
  RETURNING
  -- column names
    event_type, team_id, start_day, end_day, start_time, end_time, meeting_time, event_location, event_description
  `;
  return newEvent.map((event) => camelcaseKeys(event));
}

export async function getEvents(teamId: number) {
  const eventInfo = await sql`
    SELECT
    id,
    event_type,
    team_id,
    TO_CHAR(start_day, 'DD.MM.YYYY') start_day,
    TO_CHAR(end_day, 'DD.MM.YYYY') end_day,
    start_time,
    end_time,
    meeting_time,
    event_location,
    event_description
    FROM
      events
    WHERE
    team_id = ${teamId}
  `;
  return eventInfo.map((event) => camelcaseKeys(event));
}

export async function getTeamAndId() {
  const eventTypes = await sql`
    SELECT
    id,
    title
    FROM
      event_types
  `;
  return eventTypes.map((types) => camelcaseKeys(types));
}

export async function getAllTeamNamesandId() {
  const teams = await sql`
    SELECT
    id,
    team_name
    FROM
      teams
  `;
  return teams.map((team) => camelcaseKeys(team));
}

export async function getCoachTeamsByUserId(userId: number) {
  if (!userId) return undefined;

  const teams = await sql`
    SELECT
    *
    FROM
      teams
    WHERE
    coach_user_id = ${userId}
  `;
  return teams.map((team) => camelcaseKeys(team));
}

// TODO: Write DELETE TEAM FUNCTION
export async function deleteTeam(teamId: number) {
  const teamInfo = await sql`
    DELETE FROM
     teams
    WHERE
    teamId = ${teamId}
    RETURNING *
  `;
  return teamInfo.map((team) => camelcaseKeys(team));
}

export async function getPlayerTeamsByUserId(userId: number) {
  if (!userId) return undefined;

  const teamsOfPlayer = await sql`
    SELECT
    teams.id,
    teams.team_name,
    teams.sport_type,
    teams.founded
    FROM
      team_user, teams
    WHERE
      team_user.status_id = 1
    AND
      team_user.users_id = ${userId}
    AND
      team_user.team_id = teams.id
  `;
  return teamsOfPlayer.map((team) => camelcaseKeys(team));
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
  // Security: If the user is not logged in, we do not allow
  // access and return an error from the database function
  if (!token) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  // Return undefined if username is falsy
  // (for example, an undefined or '' value for the username)
  if (!username) return undefined;

  // Security: Retrieve user via the session token
  const userFromSession = await getUserByValidSessionToken(token);

  // If there is either:
  // - no valid session matching the token
  // - no user matching the valid session
  // ...return undefined
  if (!userFromSession) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      user_first_name,
      user_last_name,
      username,
      user_email,
      user_role_id
    FROM
      users
    WHERE
      username = ${username}
  `;

  // If we have no user, then return undefined
  const user = users[0];
  if (!user) return undefined;

  // Security: Match ids of session user with user
  // corresponding to requested username
  if (user.id !== userFromSession.id) {
    const errors: ApplicationError[] = [{ message: 'Access denied' }];
    return errors;
  }

  return camelcaseKeys(user);
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
  console.log();
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

  return await getUserById(session.usersId);
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

export async function insertFiveMinuteSessionWithoutUserId(token: string) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
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
