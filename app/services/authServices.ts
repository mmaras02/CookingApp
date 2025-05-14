import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "@/app/types";

const SignUpUser = async ({ email, password, username, full_name } : UserInfo) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error)
        alert(error.message);

    const user = data.user;
    if(!user)
        return { error: { message: 'User could not be created'}};

    const { error: profileError } = await supabase
        .from('profiles')
        .insert({
            id: user.id,
            full_name,
            username,
        })
    if(profileError){
        alert(profileError.message);
        console.log("here is the prob");
    }
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    return { user };
}

const SignInUser = async ({ email, password } : { email: string, password: string} ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    
      if (error) {
        alert(error.message);
        return null;
      }
    
    const profile = await GetUserProfile(data.user.id);

    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    return profile;

}

const SignOutUser = async() => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("user");
}

const GetUserProfile = async(id: any) => {
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (profileError) {
    console.log(profileError.message);
    return;
    }

    console.log("data", profile);
    
    return profile;
}

export default { SignUpUser, SignInUser, SignOutUser, GetUserProfile };