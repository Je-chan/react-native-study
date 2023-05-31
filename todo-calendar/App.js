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
import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hook/use-calendar";

const COLUMN_SIZE = 35;

const Column = ({ text, color, opacity, disabled, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: COLUMN_SIZE,
        height: COLUMN_SIZE,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "#c2c2c2" : "transparent",
        borderRadius: COLUMN_SIZE / 2,
      }}
    >
      <Text style={{ color, opacity }}>{text}</Text>
    </TouchableOpacity>
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

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,

    showDatePicker,
    hideDatePicker,
    handleConfirm,

    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;

  const columns = getCalendarColumns(selectedDate);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD");
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton iconNm="arrow-left" onPress={onPressLeftArrow} />

          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>

          <ArrowButton iconNm="arrow-right" onPress={onPressRightArrow} />
        </View>

        <View style={{ flexDirection: "row" }}>
          {new Array(7).fill(null).map((_, day) => {
            const dateText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={day}
                text={dateText}
                color={color}
                opacity={1}
                disabled={true}
              />
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
    const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");
    const onPress = () => {
      setSelectedDate(date);
    };

    const isSelected = dayjs(date).isSame(selectedDate, "date");
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
