import { useState } from "react";
import dayjs from "dayjs";

const defaultTodoList = [
  {
    id: 1,
    content: "운동하기",
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: "공부하기",
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: "토이 프로젝트하기",
    date: dayjs(),
    isSuccess: true,
  },
];

export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState([]);

  const [input, setInput] = useState("");
  const addTodo = () => {
    const newTodoList = [
      ...todoList,
      {
        id:
          todoList.length > 0
            ? todoList.reduce((acc, cur) => {
                if (acc < cur) return cur;
                else return acc;
              }, 0) + 1
            : 0,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];
    setTodoList(newTodoList);
  };

  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  };

  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) return { ...todo, isSuccess: !todo.isSuccess };
      else return todo;
    });

    setTodoList(newTodoList);
  };

  return {
    todoList,

    input,
    setInput,

    addTodo,
    removeTodo,
    toggleTodo,
  };
};
