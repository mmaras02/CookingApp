import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./navigation/stackNavigation";

const Layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <StackNavigator />
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaProvider> 
  );
};

export default Layout;