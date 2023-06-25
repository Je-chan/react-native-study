import { Button } from "./Button";
import { useWindowDimensions } from "react-native";
import { RemoteImage } from "./RemoteImage";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export default function PhotoListItem(props) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const onPressItem = useCallback(() => {
    navigation.navigate("ImageDetail", { url: props.url });
  }, []);

  return (
    <Button onPress={onPressItem} paddingHorizontal={20} paddingVertical={10}>
      <RemoteImage url={props.url} width={width - 40} height={width * 1.2} />
    </Button>
  );
}
