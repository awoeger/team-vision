import argon2 from 'argon2';
// eslint-disable-next-line unicorn/prefer-node-protocol
import crypto from 'crypto';
import Tokens from 'csrf';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateCsrfSecretByToken } from '../../util/auth';
import { createSerializedSessionCookie } from '../../util/cookies';
// Since all files in the API folder
// are server-side only, we can import from
// the database statically at the top
import {
  deleteExpiredSessions,
  deleteSessionByToken,
  getValidSessionByToken,
  insertSession,
  insertUser,
} from '../../util/database';
import { ApplicationError, User } from '../../util/types';

const tokens = new Tokens();

export type RegisterResponse = { user: User } | { errors: ApplicationError[] };

// An API Route needs to define the response
// that is returned to the user
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      roleId,
      csrfToken,
    }: {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
      email: string;
      roleId: number;
      csrfToken: string;
    } = req.body;

    const sessionToken = req.cookies.sessionTokenRegister;

    const registerSession = await getValidSessionByToken(sessionToken);

    if (!registerSession) {
      return res.status(400).json({ errors: [{ message: 'Invalid session' }] });
    }

    const csrfSecret = generateCsrfSecretByToken(registerSession.token);

    // Security: Check CSRF Token
    const isCsrfTokenValid = tokens.verify(csrfSecret, csrfToken);

    if (!isCsrfTokenValid) {
      return res
        .status(400)
        .json({ errors: [{ message: "CSRF token doesn't match" }] });
    }

    // Delete matching short-lived session
    await deleteSessionByToken(sessionToken);

    // Create a hash of the password to save in the database
    const userPasswordHash = await argon2.hash(password);
    const user = {
      firstName,
      lastName,
      username,
      email,
      userPasswordHash,
      roleId,
    };

    // ID is created in insertUser function when we are passing user as an argument
    const userNew = await insertUser(user);
    console.log('newUser', userNew);

    // Clean up expired sessions
    await deleteExpiredSessions();

    // Generate token consisting of a long string of letters
    // and number, which will serve as a record that the user
    // at one point did log in correctly
    const token = crypto.randomBytes(64).toString('base64');

    // Save the token to the database with a automatically generated time limit of 24 hours

    // use userNew, because it has the ID as well, see comment above
    const session = await insertSession(token, userNew.id);

    const cookie = createSerializedSessionCookie(session.token);

    return res
      .status(200)
      .setHeader('Set-Cookie', cookie)
      .json({ user: userNew });
  }

  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
