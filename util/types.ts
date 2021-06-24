export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type ApplicationError = { message: string };
