import React, { useCallback } from "react";
import { useWindowDimensions, View } from "react-native";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RemoteImage } from "../components/RemoteImage";

export default function ImageDetailScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Icon iconName={"arrow-back"} onPress={onPressBack} />
        <Header.Title title={"IMAGE DETAIL"} />
      </Header>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <RemoteImage
          url={route.params.url}
          width={width}
          height={width * 1.5}
        />
      </View>
    </View>
  );
}
