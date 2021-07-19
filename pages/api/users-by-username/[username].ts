import { NextApiRequest, NextApiResponse } from 'next';
import { convertQueryValueString } from '../../../util/context';
import {
  deleteTeam,
  getUserByUsernameAndToken,
  getValidSessionByToken,
} from '../../../util/database';

// import { ApplicationError, User } from '../../../util/types';

// export type SingleUserResponseType =
// singleUserResponseType can be an object with user, which can be either Type User or null
// or it can be an error
// { user: User | null } | { errors: ApplicationError[] };

// type SingleUserResponseType =
//   | { user: User | null; id: number }
//   | { errors: ApplicationError[] };

export default async function singleUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);

    const id = req.body.id;

    // check if userId, etc. is not undefined
    if (!validSession) {
      return res
        .status(403)
        .json({ errors: [{ message: 'No valid session.' }] });
    }

    // updatedStatusId is equal to the result of function updatePlayerRequest
    const deletedTeam = await deleteTeam(id);

    return res.status(200).json({ id: deletedTeam });
  }

  // Retrieve username from the query string (the square
  // bracket notation in the filename)
  const username = convertQueryValueString(req.query.username);

  // Retrieve the session token from the cookie that
  // has been forwarded from the frontend (in
  // getServerSideProps in the page component file)
  const token = convertQueryValueString(req.cookies.sessionToken);

  // Get either an array of errors OR a user
  const result = await getUserByUsernameAndToken(username, token);

  // If we have received an array of errors, set the
  // response accordingly
  if (Array.isArray(result)) {
    return res.status(403).json({ errors: result });
  }

  // If we've successfully retrieved a user, return that instead
  return res.status(200).json({ user: result || null });
}
