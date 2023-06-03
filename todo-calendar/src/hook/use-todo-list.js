import {useEffect, useState} from "react";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultTodoList = [
  // {
  //   id: 1,
  //   content: "운동하기",
  //   date: dayjs(),
  //   isSuccess: true,
  // },
  // {
  //   id: 2,
  //   content: "공부하기",
  //   date: dayjs(),
  //   isSuccess: false,
  // },
  // {
  //   id: 3,
  //   content: "토이 프로젝트하기",
  //   date: dayjs(),
  //   isSuccess: true,
  // },
];

const TODO_LIST_KEY = 'TODO_LIST_KEY'

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList);

  const [input, setInput] = useState("");

  const setAsyncStorage = (newTodoList) => {
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList))
  }

  const addTodo = () => {
    const newTodoList = [
      ...todoList,
      {
        id:
          todoList.length > 0
            ? todoList.reduce((acc, cur) => {
                if (acc < cur) return cur;
                else return acc;
              }, 0) + 2
            : 0,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];
    setTodoList(newTodoList);
    setAsyncStorage(newTodoList)
  };

  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
    setAsyncStorage(newTodoList)
  };

  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) return { ...todo, isSuccess: !todo.isSuccess };
      else return todo;
    });

    setTodoList(newTodoList);
    setAsyncStorage(newTodoList)
  };

  const resetInput = () => setInput("")

  const filteredTodoList = todoList.filter(todo => {
    return dayjs(todo.date).isSame(selectedDate, 'date')
  })

  useEffect(() => {
    init()
  }, []);

  const init =  async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY)
    if(result) {
      setTodoList(JSON.parse(result))
    }
  }

  return {
    todoList,
    filteredTodoList,
    input,
    setInput,

    addTodo,
    removeTodo,
    toggleTodo,

    resetInput,
  };
};
