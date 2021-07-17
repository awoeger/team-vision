export type User = {
  id?: number;
  userFirstName: string;
  userLastName: string;
  username: string;
  userEmail: string;
  userRoleId: number;
};

export type UserWithPasswordHash = User & {
  userPasswordHash: string;
};

export type UserInEvent = {
  usersId: number;
  eventId: number;
  response: string;
};

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  usersId: number;
};

export type ApplicationError = { message: string };

export type TeamInfo = {
  teamName: string;
  sportType: string;
  foundedAt: string;
};

export type PlayerRequest = {
  teamChoice: string;
  positionOnTeam: string;
  playingSince: string;
  experienceLevel: string;
  message: string;
  usersId: number;
};

export type NewEvent = {
  eventType: string;
  teamId: number;
  startDate: Date;
  endDate: Date;
  meetingTime: string;
  startTime: string;
  endTime: string;
  eventLocation: string;
  eventDescription: string;
};

// Types for profile page
export type CoachTeam = {
  id: number;
  teamName: string;
  sportType: string;
  founded: string;
  coachUserId: number;
};

export type PlayerTeam = {
  id: number;
  teamName: string;
  sportType: string;
  founded: string;
  statusId: number;
};

export type DeletedTeamResponse = {
  id: Number;
};

// Types for team profile page

export type DeleteEventRequest = {
  id: Number;
};

export type TeamName = {
  teamName: string;
};

export type Event = {
  id: number;
  eventType: string;
  teamId: number;
  formattedStartDay: string;
  formattedEndDay: string;
  startTime: string;
  endTime: string;
  meetingTime: string;
  eventLocation: string;
  eventDescription: string;
};

// Types for exercise page

export type Exercise = {
  id: number;
  bodypart: string;
  title: string;
  equipment: string;
  video: string;
};

// Types Team Member Page
export type Member = {
  id: number;
  experienceLevel: string;
  playerMessage: string;
  playingSince: string;
  positionOnTeam: string;
  statusId: number | string;
  userFirstName: string;
  userLastName: string;
};

export type UpdateRequestResponse = {
  statusId: number;
};

export type DeclinedPlayerRequestResponse = {
  id: number;
};

// Types Individual Event Page
export type Response = {
  usersId: number;
  userFirstName: string;
  userLastName: string;
  response: string;
};

export type LoggedInUser = {
  id: number;
  userFirstName: string;
  userLastName: string;
};

export type SingleEvent = {
  id: number;
  eventType: string;
  teamId: number;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  meetingTime: string;
  eventLocation: string;
  eventDescription: string;
};

export type UpdateEventResponse = {
  usersId: number;
  eventId: number;
  response: string;
};

// Types for player-request

export type TeamNameandIdforCoach = {
  id: number;
  teamName: string;
};
