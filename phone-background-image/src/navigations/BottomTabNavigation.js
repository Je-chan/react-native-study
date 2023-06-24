import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ImageListScreen from "../screen/ImageListScreen";
import FavoriteImageListScreen from "../screen/FavoriteImageListScreen";
import { TabIcon } from "../components/TabIcon";

const Tabs = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const getIconName = () => {
            if (route.name === "ImageList") {
              return "home";
            }

            if (route.name === "FavoriteImageList") {
              return "star";
            }
          };

          const iconName = getIconName();
          return (
            <TabIcon
              iconName={iconName}
              iconColor={focused ? "tomato" : "gray"}
            ></TabIcon>
          );
        },
      })}
    >
      <Tabs.Screen name={"ImageList"} component={ImageListScreen} />
      <Tabs.Screen
        name={"FavoriteImageList"}
        component={FavoriteImageListScreen}
      />
    </Tabs.Navigator>
  );
}
