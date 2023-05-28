import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import Header from "./src/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Profile from "./src/Profile";
import { friendProfiles, myProfile } from "./src/data";
import Margin from "./src/Margin";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import FriendList from "./src/FriendList";
import { useState } from "react";
import TabBar from "./src/TabBar";

export default function App() {
  const [isOpened, setIsOpened] = useState(true);

  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  };

  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <Header />

      <Margin height={10} />

      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />

      <Margin height={15} />

      <Division />

      <Margin height={12} />

      <FriendSection
        friendCount={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpend={isOpened}
      />

      <Margin height={12} />
    </View>
  );

  const ItemSeparatorComponent = () => <Margin height={13} />;

  const renderItem = ({ item }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name}
        introduction={item.introduction}
        isMe={false}
      />
    </View>
  );

  const ListFooterComponent = () => <Margin height={10} />;

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView edges={["right", "top", "bottom"]}>
          <FlatList
            data={friendProfiles}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            keyExtractor={(_, index) => index}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </SafeAreaProvider>

      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );

  //   return (
  //     <View style={styles.container}>
  //       <SafeAreaProvider>
  //         <SafeAreaView
  //           style={{ flex: 1, paddingHorizontal: 15 }}
  //           edges={["right", "top", "left"]}
  //         >
  //           <Header />
  //
  //           <Margin height={10} />
  //
  //           <Profile
  //             uri={myProfile.uri}
  //             name={myProfile.name}
  //             introduction={myProfile.introduction}
  //           />
  //
  //           <Margin height={15} />
  //
  //           <Division />
  //
  //           <Margin height={12} />
  //
  //           <FriendSection
  //             friendCount={friendProfiles.length}
  //             onPressArrow={onPressArrow}
  //             isOpend={isOpened}
  //           />
  //
  //           <FriendList data={friendProfiles} isOpend={isOpened} />
  //         </SafeAreaView>
  //       </SafeAreaProvider>
  //
  //       <TabBar
  //         selectedTabIdx={selectedTabIdx}
  //         setSelectedTabIdx={setSelectedTabIdx}
  //       />
  //     </View>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
