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
  id: number;
};

export type ApplicationError = { message: string };
