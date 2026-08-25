import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useRef, useState } from "react";
import {
  addTodo,
  deleteTodo,
  toggleComplete,
  updateTodo,
} from "../features/todos/todoSlice";

const TodoComp = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [todoInput, setTodoInput] = useState<string>("");
  const [todoUpdateId, setTodoUpdateId] = useState<number>(-1);

  const handleAddTodo = () => {
    if (!todoInput.trim()) return;

    dispatch(addTodo(todoInput));
    setTodoInput("");

    if (inputRef.current) inputRef.current.focus();
  };

  const handleTodoUpdate = (id: number, text: string) => {
    setTodoInput(text);
    setTodoUpdateId(id);

    if (inputRef.current) inputRef.current.focus();
  };

  const saveTodo = () => {
    dispatch(updateTodo({ id: todoUpdateId, text: todoInput }));

    setTodoInput("");
    setTodoUpdateId(-1);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-8">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="Add a todo"
          className="flex-1 rounded border p-3"
        />

        {todoUpdateId > 0 && (
          <button
            onClick={saveTodo}
            className="cursor-pointer rounded border px-4 py-1 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!todoInput}
          >
            Save
          </button>
        )}

        <button
          onClick={handleAddTodo}
          className="cursor-pointer rounded border px-4 py-1 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!todoInput || todoUpdateId > 0}
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between gap-2 rounded border p-2"
          >
            <label className="flex flex-1 truncate items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
              />
              <span
                className={`${todo.completed ? "line-through opacity-50" : ""}`}
              >
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => handleTodoUpdate(todo.id, todo.text)}
              className="cursor-pointer rounded border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={todo.completed}
            >
              Update
            </button>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="cursor-pointer rounded border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={todo.completed}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComp;
