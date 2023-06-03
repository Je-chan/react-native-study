import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image, KeyboardAvoidingView, Platform, Pressable, Keyboard, Alert
} from "react-native";
import dayjs from "dayjs";
import {bottomSpace, getCalendarColumns, getDayColor, getDayText, ITEM_WIDTH, statusBarHeight} from "./src/utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hook/use-calendar";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {useTodoList} from "./src/hook/use-todo-list";
import {Ionicons} from '@expo/vector-icons'
import Calendar from "./src/Calendar";
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";
import {useRef} from "react";

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

  const {
filteredTodoList,
    input,
    setInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput
  } = useTodoList(selectedDate)

  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null)

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker
  const onPressRightArrow = add1Month;

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={setSelectedDate}
      />

      <Margin height={15}/>

      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: "#a3a3a3",
          alignSelf: "center"
        }}
      />

      <Margin height={15}/>
    </View>
  )

  const renderItem = ({item: todo}) => {
    const isSuccess = todo.isSuccess
    const onPress = () => toggleTodo(todo.id)
    const onLongPress = () => {
      Alert.alert("삭제하시겠습니까?", "" , [
        {
          style: "cancel",
          text: "아니요"
        },
        {
          text: "네",
          onPress: () => removeTodo(todo.id)
        }
      ])
    }
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          flexDirection: "row",
          width: ITEM_WIDTH,
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6"
      }}>
        <Text style={{ flex: 1, fontSize: 14, color:"#595959"}}>{todo.content}</Text>
        <Ionicons
          name={"ios-checkmark"}
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf" }
        />
      </Pressable>
    )
  }

  const onPressAdd = () => {
    addTodo();
    resetInput()
    onFocus()
  }

  const onSubmitEditing = () => {
    addTodo()
    resetInput()
  }

  const onFocus = () => {
    setTimeout(() => {

      flatListRef.current?.scrollToEnd()
    }, 300)
  }
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute"
        }}
      />

      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : "height"}
      >
        <>
          <FlatList
            ref={flatListRef}
            data={filteredTodoList}
            stlye={{flex: 1}}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{paddingTop: statusBarHeight + 30}}
            renderItem={renderItem} />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('MM.DD')}에 추가할 ToDo`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
          />
        </>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace}/>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
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
