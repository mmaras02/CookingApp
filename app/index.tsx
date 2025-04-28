import React from 'react';
import Layout from './_layout';
import { UserProvider } from './context/userSessionContext';

const App = () => {
    return (
        <UserProvider>
            <Layout />
        </UserProvider>
    )
}

export default App;