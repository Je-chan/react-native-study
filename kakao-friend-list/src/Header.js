/** @format */
import { View, Text, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
const IconBtn = (props) => {
  return (
    <View style={{paddingHorizontal: 6}}>
      <Ionicons name={props.name} size={24} color="black"/>
    </View>
  )
}

export default () => {
  return (
    <View style={{flexDirection:"row", justifyContent: "space-between", paddingVertical: 10}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>친구</Text>

      <View style={{flexDirection: "row"}}>
        <IconBtn name="search-outline"/>
        <IconBtn name="person-add-outline"/>
        <IconBtn name="md-musical-notes-outline"/>
        <IconBtn name="ios-settings-outline"/>
      </View>
    </View>
  );
};
