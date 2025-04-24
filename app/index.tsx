import React from 'react';
import Layout from './_layout';
import { UserProvider } from './context/userSessionContext';
import { useFonts as useQuicksand, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

const App = () => {
    const [fontsLoadedQuicksand] = useQuicksand({
        Quicksand_400Regular,
        Quicksand_700Bold,
    });

    return (
        <UserProvider>
            <Layout />
        </UserProvider>
       
    )
}

export default App;
