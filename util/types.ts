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
  id: Number;
  teamName: String;
  sportType: String;
  founded: String;
  coachUserId: Number;
};

export type PlayerTeam = {
  id: Number;
  teamName: String;
  sportType: String;
  founded: String;
  statusId: Number;
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
