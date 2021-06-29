// Since all files in the API folder
// are server-side only, we can import from
// the database statically at the top
import { NextApiRequest, NextApiResponse } from 'next';
import { insertUser } from '../../../util/database';
import { UserWithPasswordHash } from '../../../util/types';

// An API Route needs to define the response
// that is returned to the user
export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // const users = await getUsers();
    // return res.status(200).json({ users: users });
  } else if (req.method === 'POST') {
    const newUser: UserWithPasswordHash = {
      // id: req.body.id,
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      username: req.body.username,
      userEmail: req.body.userEmail,
      userPasswordHash: req.body.password_hash,
      userRoleId: req.body.userRoleId,
    };
    const user = await insertUser(newUser);
    return res.status(200).json({ user: user });
  }

  res.status(400).json(null);
}
