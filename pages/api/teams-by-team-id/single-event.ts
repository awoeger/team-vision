import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteEvent,
  getAllResponsesForEvent,
  getValidSessionByToken,
  insertUserToEvent,
} from '../../../util/database';

export default async function TeamMembers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);

    const { usersId, eventId, response } = req.body;

    // check if userId, etc. is not undefined
    if (!validSession) {
      return res
        .status(403)
        .json({ errors: [{ message: 'No valid session.' }] });
    }

    const attendEvent = await insertUserToEvent(usersId, eventId, response);

    return res.status(200).json({ attendEvent: attendEvent });
  }
}
