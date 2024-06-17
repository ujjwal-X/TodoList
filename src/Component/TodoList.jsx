import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "simple", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return; // Prevent adding empty tasks
    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };

  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const markAllDone = () => {
    setTodos((todos) =>
      todos.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="todo-container">
      <input
        placeholder="Add your task"
        type="text"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br />
      <button onClick={addNewTask}>Add Task</button>
      <br />
      <hr />
      <br />
      <h2>Tasks Todo</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isDone ? "done" : ""}>
            <span>{todo.task}</span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
            <button className="done" onClick={() => markAsDone(todo.id)}>
              Mark As Done
            </button>
          </li>
        ))}
      </ul>
      <button onClick={markAllDone}>Mark All Done</button>
    </div>
  );
}
