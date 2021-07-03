// mport { NextApiRequest, NextApiResponse } from 'next';
// import {
//   createNewEvent,
//   getValidSessionByToken,
// } from '../../../util/database';
// import { ApplicationError, TeamInfo } from '../../../util/types';

// export type CreateTeamResponse =
//   | {
//       teamInfo: TeamInfo;
//     }
//   | { errors: ApplicationError[] };

// export default async function createNewEventHandler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === 'POST') {
//     const validSession = await getValidSessionByToken(req.cookies.sessionToken);

//     // Retrieve variables from the request body from the frontend
//     // Destructure relevant information from the request body
//     const {
//       eventType,
//       teamId,
//       startDate,
//       endDate,
//       meetingTime,
//       startTime,
//       endTime,
//       eventLocation,
//       eventDescription,
//     } = req.body;

//     // check if userId, etc. is not undefined
//     if (!validSession) {
//       return res
//         .status(403)
//         .json({ errors: [{ message: 'No valid session.' }] });
//     }

//     // Save the team information to the database
//     const newEvent = await createNewEvent(
//       eventType,
//       teamId,
//       startDate,
//       endDate,
//       meetingTime,
//       startTime,
//       endTime,
//       eventLocation,
//       eventDescription,
//     );

//     return res.status(200).json({ event: newEvent });
//   }
// }
