import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login"; // Import Login component

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  // Load todos from localStorage when the app starts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = { id: Date.now(), ...todo };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>TODO App</h1>
          <AddTodo onAdd={addTodo} />
          <TodoList todos={todos} onDelete={deleteTodo} />
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} /> // Show Login if not logged in
      )}
    </div>
  );
};

export default App;

