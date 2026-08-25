import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1,
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const findTodo = state.todos.find((todo) => todo.id === action.payload);
      if (findTodo) {
        findTodo.completed = !findTodo.completed;
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; text: string }>,
    ) => {
      const findTodo = state.todos.find(
        (todo) => todo.id === action.payload.id,
      );
      if (findTodo) {
        findTodo.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const filterTodo = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );
      state.todos = filterTodo;
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
