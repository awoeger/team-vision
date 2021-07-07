import { NextApiRequest, NextApiResponse } from 'next';
import { deleteEvent, getValidSessionByToken } from '../../../util/database';

export default async function TeamMembers(
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
    const deletedEvent = await deleteEvent(id);

    return res.status(200).json({ statusId: deletedEvent });
  }
}
