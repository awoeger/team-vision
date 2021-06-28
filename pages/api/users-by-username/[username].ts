import { NextApiRequest, NextApiResponse } from 'next';
import { convertQueryValueString } from '../../../util/context';
import { getUserByUsernameAndToken } from '../../../util/database';

// API design here is not so great, maybe don't copy
export default async function singleUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const username = convertQueryValueString(req.query.username);

  const token = convertQueryValueString(req.cookies.sessionToken);

  const user = await getUserByUsernameAndToken(username, token);
  return res.status(200).json({ user: user || null });
}
