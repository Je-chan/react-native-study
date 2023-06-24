import React from "react";
import { View } from "react-native";
import { Typography } from "../components/Typography";

export default function ImageDetailScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography fontSize={20}>IMAGE DETAIL</Typography>
    </View>
  );
}
