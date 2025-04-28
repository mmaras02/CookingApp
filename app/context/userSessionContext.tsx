import { createContext, useEffect, useState } from "react";
import React from "react";
import { supabase } from "@/lib/supabase";
import { UserState } from "../types";
import { authServices } from "@/app/services";

type UserContextType = {
    user: UserState | null;
    setUser: React.Dispatch<React.SetStateAction<UserState | null>>;
};
const userContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children } : { children: any}) => {
    const [user, setUser] = useState<UserState | null>(null);

    const fetchUser = async() => {
        try {
            const { data: { user: currentUser }, error } = await supabase.auth.getUser();

            if (error || !currentUser) {
                setUser(null);
                return;
            }

            const userProfile = await authServices.GetUserProfile(currentUser.id);
            setUser({ user: currentUser, profile: userProfile });
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
        }
    }

    useEffect(() => {
        fetchUser();
        const { data: listener } = supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                fetchUser();
            }
        });
    
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => {
    const context = React.useContext(userContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };