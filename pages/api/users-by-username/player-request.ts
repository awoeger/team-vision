import { NextApiRequest, NextApiResponse } from 'next';
import {
  createPlayerRequest,
  getValidSessionByToken,
} from '../../../util/database';
import { ApplicationError, TeamInfo } from '../../../util/types';

export type CreateTeamResponse =
  | {
      teamInfo: TeamInfo;
    }
  | { errors: ApplicationError[] };

export default async function playerRequestHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);

    // Retrieve info from the request body from the frontend
    // Destructure relevant information from the request body
    const {
      teamChoice,
      positionOnTeam,
      playingSince,
      experienceLevel,
      message,
    } = req.body;

    // check if userId, etc. is not undefined
    if (!validSession) {
      return res
        .status(403)
        .json({ errors: [{ message: 'No valid session.' }] });
    }

    // TODO: Write function for player request
    // Save the team information to the database
    const playerRequest = await createPlayerRequest(
      teamChoice,
      positionOnTeam,
      playingSince,
      experienceLevel,
      message,
      validSession.usersId,
    );

    return res.status(200).json({ playerRequest: playerRequest });
  }
}
