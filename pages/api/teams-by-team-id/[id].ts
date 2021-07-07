import { NextApiRequest, NextApiResponse } from 'next';
import {
  deletePlayerRequest,
  getAllMembers,
  getValidSessionByToken,
  updatePlayerRequest,
} from '../../../util/database';

export default async function TeamMembers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);

    const id = req.body.id;

    // check if userId, etc. is not undefined
    if (!validSession) {
      return res
        .status(403)
        .json({ errors: [{ message: 'No valid session.' }] });
    }

    // updatedStatusId is equal to the result of function updatePlayerRequest
    const updatedStatusId = await updatePlayerRequest(id);

    return res.status(200).json({ statusId: updatedStatusId });
  }

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
    const declinedRequest = await deletePlayerRequest(id);

    return res.status(200).json({ statusId: declinedRequest });
  }

  const allMembers = await getAllMembers(Number(req.query.id));

  // const acceptedMembers = await getAllAcceptedMembers(Number(req.query.id));

  // const awaitingMembers = await getAllAwaitingMembers(Number(req.query.id));

  return res.status(200).json({
    // acceptedMembers: acceptedMembers,
    // awaitingMembers: awaitingMembers,
    allMembers: allMembers,
  });
}
