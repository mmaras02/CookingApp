export type User = {
        id?: string;
        email?: string;
        password?: string;
};

export type UserProfile = {
        id?: string;
        username: string;
        full_name: string;
        profile_img?: string | null;
};

export type UserState = {
        user: User;
        profile: UserProfile;
};

export type UserInfo = {
        email: string;
        password: string;
        username: string;
        full_name: string;
};
