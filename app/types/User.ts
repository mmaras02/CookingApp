export type User = {
    email?: string,
    password?: string;
};

export type UserProfile = {
  id?: string,
  username: string;
  full_name: string;
  profile_img?: string | null,
};

export type UserState = {
  user: User;
  profile: UserProfile;
};