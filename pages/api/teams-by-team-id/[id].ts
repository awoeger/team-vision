import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTeamMembersInfoandRequests } from '../../../util/database';

export default async function TeamMembers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.query);

  const allMembers = await getAllTeamMembersInfoandRequests(
    Number(req.query.id),
  );
  console.log('allMembers', allMembers);

  return res.status(200).json({
    allMembers: allMembers,
  });
}
