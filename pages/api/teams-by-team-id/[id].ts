import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllAcceptedMembers,
  getAllAwaitingMembers,
} from '../../../util/database';

export default async function TeamMembers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.query);

  const acceptedMembers = await getAllAcceptedMembers(Number(req.query.id));

  const awaitingMembers = await getAllAwaitingMembers(Number(req.query.id));

  return res.status(200).json({
    acceptedMembers: acceptedMembers,
    awaitingMembers: awaitingMembers,
  });
}
