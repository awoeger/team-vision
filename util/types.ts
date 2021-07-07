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
