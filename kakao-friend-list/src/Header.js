/** @format */
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconBtn = (props) => {
  return (
    <TouchableOpacity
      // hitSlop 을 사용하면 터치 범위를 늘릴 수 있다
      hitSlop={{ top: 10, bottom: 10 }}
      style={{ paddingHorizontal: 6 }}
    >
      <Ionicons name={props.name} size={24} color="black" />
    </TouchableOpacity>
  );
};

export default () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>친구</Text>

      <View style={{ flexDirection: "row" }}>
        <IconBtn name="search-outline" />
        <IconBtn name="person-add-outline" />
        <IconBtn name="md-musical-notes-outline" />
        <IconBtn name="ios-settings-outline" />
      </View>
    </View>
  );
};
