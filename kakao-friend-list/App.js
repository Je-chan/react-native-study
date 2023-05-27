import { StatusBar } from 'expo-status-bar';
import {Platform,  StyleSheet} from 'react-native';
import Header from './src/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import MyProfile from "./src/MyProfile";
import {myProfile} from "./src/data";
import Margin from "./src/Margin";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
        <Header />

        <Margin height={10}/>

        <MyProfile
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
        />
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
