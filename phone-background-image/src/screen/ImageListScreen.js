import React, { FlatList, View } from "react-native";
import Header from "../components/Header";
import { IMAGE_LIST } from "../constants";
import PhotoListItem from "../components/PhotoListItem";

export default function ImageListScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title={"IMAGE LIST"}></Header.Title>
        </Header.Group>
      </Header>

      <FlatList
        style={{ flex: 1 }}
        data={IMAGE_LIST}
        renderItem={({ item }) => {
          return <PhotoListItem url={item} />;
        }}
      ></FlatList>
    </View>
  );
}
