import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllAcceptedMembers,
  getAllAwaitingMembers,
  getValidSessionByToken,
  updatePlayerRequest,
} from '../../../util/database';

export default async function TeamMembers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);

    const id = req.body;

    // check if userId, etc. is not undefined
    if (!validSession) {
      return res
        .status(403)
        .json({ errors: [{ message: 'No valid session.' }] });
    }

    const updatedStatusId = await updatePlayerRequest(id);

    return res.status(200).json({ statusId: updatedStatusId });
  }

  const acceptedMembers = await getAllAcceptedMembers(Number(req.query.id));

  const awaitingMembers = await getAllAwaitingMembers(Number(req.query.id));

  return res.status(200).json({
    acceptedMembers: acceptedMembers,
    awaitingMembers: awaitingMembers,
  });
}
