import React, { View } from "react-native";
import { Typography } from "../components/Typography";

export default function ImageListScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography fontSize={20}>Image List</Typography>
    </View>
  );
}
