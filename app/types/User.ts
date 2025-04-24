export type User = {
    email: string,
    password: string;
    username: string | undefined;
    full_name: string | undefined;
  };

export type Admin = {
  email: string,
  password: string;
}

export type UserState = {
  user: any | null;
  profile: any | null;
};