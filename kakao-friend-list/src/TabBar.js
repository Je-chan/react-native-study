import { TouchableOpacity, View } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";

const bottomSpace = getBottomSpace();
const TabButton = ({
  isSelected,
  onPress,
  activeIconNm,
  inactiveIconNm,
  isIconFontisto,
  isIconIonicons,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
      }}
      onPress={onPress}
    >
      {isIconFontisto && (
        <Fontisto
          name={isSelected ? activeIconNm : inactiveIconNm}
          size={24}
          color={"black"}
        />
      )}
      {isIconIonicons && (
        <Ionicons
          name={isSelected ? activeIconNm : inactiveIconNm}
          size={24}
          color={"black"}
        />
      )}
    </TouchableOpacity>
  );
};

export default ({ selectedTabIdx, setSelectedTabIdx }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingBottom: bottomSpace,
        borderTopWidth: 0.5,
        borderTopColor: "lightgray",
      }}
    >
      <TabButton
        isSelected={selectedTabIdx === 0}
        onPress={() => setSelectedTabIdx(0)}
        activeIconNm={"person"}
        inactiveIconNm={"persons"}
        isIconFontisto
      />

      <TabButton
        isSelected={selectedTabIdx === 1}
        onPress={() => setSelectedTabIdx(1)}
        activeIconNm={"chatbubble"}
        inactiveIconNm={"chatbubble-outline"}
        isIconIonicons
      />

      <TabButton
        isSelected={selectedTabIdx === 2}
        onPress={() => setSelectedTabIdx(2)}
        activeIconNm={"pricetag"}
        inactiveIconNm={"pricetag-outline"}
        isIconIonicons
      />

      <TabButton
        isSelected={selectedTabIdx === 3}
        onPress={() => setSelectedTabIdx(3)}
        activeIconNm={"add-circle"}
        inactiveIconNm={"add-circle-outline"}
        isIconIonicons
      />
    </View>
  );
};
