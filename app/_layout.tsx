import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import App from '@/app/index';
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <App />
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaProvider> 
  );
}
