import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import { getCalendarColumns, getDayColor, getDayText } from "./src/utils";
import Margin from "./src/Margin";
import { SimpleLineIcons } from "@expo/vector-icons";
const COLUMN_SIZE = 35;

const Column = ({ text, color, opacity }) => {
  return (
    <View
      style={{
        width: COLUMN_SIZE,
        height: COLUMN_SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color, opacity }}>{text}</Text>
    </View>
  );
};

const ArrowButton = ({ iconNm, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingHorizontal: 20, paddingVertical: 10 }}
    >
      <SimpleLineIcons name={iconNm} size={15} color={"#404040"} />
    </TouchableOpacity>
  );
};

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format("YYYY.MM.DD");
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton iconNm="arrow-left" />

          <TouchableOpacity>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>

          <ArrowButton iconNm="arrow-right" />
        </View>

        <View style={{ flexDirection: "row" }}>
          {new Array(7).fill(null).map((_, day) => {
            const dateText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column key={day} text={dateText} color={color} opacity={1} />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
    const isCurrentMonth = dayjs(date).isSame(now, "month");
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 한 줄에 몇 개를 렌더링해줄지 결정하는 Attribute, numColumns */}
      <FlatList
        data={columns}
        keyExtractor={(_, idx) => `column-${idx}`}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
