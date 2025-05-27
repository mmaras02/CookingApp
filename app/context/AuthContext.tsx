import { createContext, useEffect, useMemo, useState } from "react";
import React from "react";
import { supabase } from "@/lib/supabase";
import { UserState } from "@/app/types";
import { authServices } from "@/app/services";

type UserContextType = {
    user: UserState | null;
    setUser: React.Dispatch<React.SetStateAction<UserState | null>>;
};

const userContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserState | null>(null);

    const loadUserFromSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
            setUser(null);
            return;
        }

        const supabaseUser = session.user;
        const userProfile = await authServices.GetUserProfile(supabaseUser.id);
        setUser({ user: supabaseUser, profile: userProfile });
    };

    useEffect(() => {
        loadUserFromSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                const userProfile = await authServices.GetUserProfile(session.user.id);
                setUser({ user: session.user, profile: userProfile });
            } else {
                setUser(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(userContext);
    if (!context) throw new Error("useAuth must be used within a UserProvider");
    return context;
};
