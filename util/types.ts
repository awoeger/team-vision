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

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  usersId: number;
};

export type ApplicationError = { message: string };
