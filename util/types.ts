export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roleId: number;
};

export type UserWithPasswordHash = User & {
  userPasswordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  userId: number;
};

export type ApplicationError = { message: string };
