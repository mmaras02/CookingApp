import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigation/stackNavigation";
import { UserProvider } from "./context/userSessionContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
          <UserProvider>
            <StackNavigator />
          </UserProvider>
        </SafeAreaView>
        <StatusBar style="auto" />
      </SafeAreaProvider> 
    </QueryClientProvider>
    
  );
};

export default Layout;
/**mia.marasovic09@gmail.com */