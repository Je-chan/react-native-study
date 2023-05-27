import { StatusBar } from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Header from './src/Header';
import {getStatusBarHeight, getBottomSpace} from "react-native-iphone-x-helper";


const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: '#fff',
    justifyContent: 'flex-starts',
  },
});
