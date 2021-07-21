import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import {
  ApplicationError,
  NewEvent,
  PlayerRequest,
  Session,
  TeamInfo,
  User,
  UserWithPasswordHash,
} from '../util/types';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();

// Read the PostgreSQL secret connection information
// (host, database, username, password) from the .env file
dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
export function connectOneTimeToDatabase() {
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
  console.log('rock');
  console.log(userFirstName);
  console.log(userLastName);
  console.log(userEmail);
  console.log(username);
  console.log(userPasswordHash);
  console.log(userRoleId);

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

  console.log(users);
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function deleteUser(id: number) {
  const deletedUser = await sql`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING
    id
  `;
  return deletedUser.map((user) => camelcaseKeys(user)[0]);
}

export async function updateUserById(
  userId: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
) {
  if (!userId) return undefined;

  const users = await sql<[User]>`
    UPDATE
      users
    SET
      user_first_name = ${firstName},
      user_last_name = ${lastName},
      username = ${username},
      user_email = ${email}
    WHERE
      id = ${userId}
    RETURNING
      id,
      user_first_name,
      user_last_name,
      username,
      user_email
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function insertUserToEvent(
  usersId: number,
  eventId: number,
  response: string,
) {
  // Returns the count of elements that are fitting the condition
  // Should be either 0 or 1
  const ifUserInEvent = await sql`
    SELECT
    COUNT(*)
    FROM
    event_user
    WHERE
    users_id = ${usersId}
    AND
    event_id = ${eventId}
  `;

  let usersInEvent;

  // if the user does not exist yet, insert them into the table
  if (ifUserInEvent[0].count === '0') {
    usersInEvent = await sql`
    INSERT INTO event_user
    -- column names
      (users_id, event_id, response)
    VALUES
      (${usersId}, ${eventId}, ${response})
    RETURNING
    users_id,
    event_id,
    response
  `;
    // otherwise we set the response to the new respnse
  } else {
    usersInEvent = await sql`
    UPDATE event_user
    SET response = ${response}
    WHERE
    users_id = ${usersId}
    AND
    event_id = ${eventId}
    `;
  }

  return usersInEvent.map((user) => camelcaseKeys(user))[0];
}

export async function getAllResponsesForEvent(eventId: number) {
  const eventInfo = await sql`
    SELECT
    eu.users_id, u.user_first_name, u.user_last_name, eu.response
    FROM
      event_user as eu,
      users as u
    WHERE
      event_id = ${eventId}
    AND
      users_id = u.id
  `;
  return eventInfo.map((event) => camelcaseKeys(event));
}

export async function getAllExercises() {
  const allExercises = await sql`
    SELECT
    *
    FROM
      exercises
  `;
  return allExercises.map((exercise) => camelcaseKeys(exercise));
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

  console.log(teams);
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
    ${usersId},  ${teamChoice}, 3, ${positionOnTeam}, ${playingSince}, ${experienceLevel}, ${message}
  )
  RETURNING
  -- column names
    users_id, team_id, status_id, position_on_team, playing_since, experience_level, player_message
  `;
  return playerRequest.map((request) => camelcaseKeys(request))[0];
}

export async function updatePlayerRequest(id: number) {
  const acceptedStatus = await sql`
    UPDATE team_user
    SET status_id = 1
    WHERE id = ${id}
  RETURNING
  -- column names
  -- This is what we map over in the next line
    status_id
  `;

  return acceptedStatus.map((status) => camelcaseKeys(status))[0];
}

export async function deletePlayerRequest(id: number) {
  const deletedStatus = await sql`
    DELETE FROM team_user
    WHERE id = ${id}
    RETURNING
    id
  `;
  return deletedStatus.map((status) => camelcaseKeys(status)[0]);
}

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
    ${eventType},  ${teamId}, ${startDate}, ${endDate}, ${startTime}, ${endTime},  ${meetingTime}, ${eventLocation}, ${eventDescription}
  )
  RETURNING
  -- column names
    event_type, team_id, start_day, end_day, start_time, end_time, meeting_time, event_location, event_description
  `;
  return newEvent.map((event) => camelcaseKeys(event));
}

export async function deleteEvent(eventId: number) {
  const deletedEvent = await sql`
    DELETE FROM
     events
    WHERE
    id = ${eventId}
    RETURNING
    id
  `;
  return deletedEvent.map((event) => camelcaseKeys(event));
}

export async function getEvents(teamId: number) {
  const eventInfo = await sql`
    SELECT
    id,
    event_type,
    team_id,
    TO_CHAR(start_day, 'DD.MM.YYYY') as formatted_start_day,
    TO_CHAR(end_day, 'DD.MM.YYYY') as formatted_end_day,
    start_time,
    end_time,
    meeting_time,
    event_location,
    event_description
    FROM
      events
    WHERE
    team_id = ${teamId}
    AND
    end_day > NOW()
    ORDER BY
    end_day ASC
  `;
  return eventInfo.map((event) => camelcaseKeys(event));
}

export async function getEventByEventId(eventId: number) {
  const event = await sql`
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
    id = ${eventId}
  `;
  return event.map((e) => camelcaseKeys(e));
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

export async function getTeamNameById(teamId: number) {
  const teamName = await sql`
    SELECT
    team_name
    FROM
      teams
    WHERE
    id = ${teamId}
    `;
  return teamName.map((name) => camelcaseKeys(name));
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

export async function getAllMembers(teamId: number) {
  if (!teamId) return undefined;

  const acceptedPlayers = await sql`
    SELECT
    u.user_first_name, u.user_last_name, t.id, t.status_id, t.position_on_team, t.playing_since, t.experience_level, t.player_message
    FROM
    users as u,
    team_user as t
    WHERE t.users_id = u.id
    AND t.team_id = ${teamId};
  `;
  return acceptedPlayers.map((player) => camelcaseKeys(player));
}

export async function getAllMembersNamesByTeamId(
  teamId: number,
  userId: number,
) {
  if (!teamId) return undefined;

  const acceptedPlayers = await sql`
    SELECT
    u.id, u.user_first_name, u.user_last_name
    FROM
    users as u,
    team_user as t
    WHERE t.users_id = u.id
    -- AND t.status_id = 1
    AND u.id = ${userId}
    AND t.team_id = ${teamId};
  `;
  return acceptedPlayers.map((player) => camelcaseKeys(player));
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

export async function deleteTeam(teamId: number) {
  const teamInfo = await sql`
    DELETE FROM
     teams
    WHERE
    id = ${teamId}
    RETURNING
    id
  `;
  return teamInfo.map((team) => camelcaseKeys(team)[0]);
}

export async function getPlayerTeamsByUserId(userId: number) {
  if (!userId) return undefined;

  const teamsOfPlayer = await sql`
    SELECT
    teams.id,
    teams.team_name,
    teams.sport_type,
    teams.founded,
    team_user.status_id
    FROM
      team_user, teams
    -- WHERE
    --   team_user.status_id = 1
    -- -- AND
    -- --   team_user.status_id = 2
    -- -- AND
    -- --   team_user.status_id = 3
    WHERE
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
      user_email,
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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
