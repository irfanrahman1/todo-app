import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch Todos from Firestore
  useEffect(() => {
    const fetchTodos = async () => {
      const todosCollection = collection(db, "todos");
      const todosSnapshot = await getDocs(todosCollection);
      const todosList = todosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosList);
    };

    fetchTodos();
  }, []);

  // Add a new Todo to Firestore
  const addTodo = async (todo) => {
    const newTodo = { title: todo.title, description: todo.description };
    const docRef = await addDoc(collection(db, "todos"), newTodo);
    setTodos([...todos, { id: docRef.id, ...newTodo }]);
  };

  // Delete a Todo from Firestore
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit a Todo in Firestore
  const editTodo = async (id, newTitle, newDescription) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { title: newTitle, description: newDescription });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, description: newDescription } : todo
      )
    );
  };

  // Filter Todos based on Search
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {isLoggedIn ? (
        <>
          <h1 style={{ textAlign: "center" }}>TODO App</h1>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Search tasks..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                flex: 1,
                marginRight: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
          <AddTodo onAdd={addTodo} />
          {filteredTodos.length > 0 ? (
            <>
              <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                Tasks ({filteredTodos.length})
              </h2>
              <TodoList todos={filteredTodos} onDelete={deleteTodo} onEdit={editTodo} />
            </>
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px", fontStyle: "italic" }}>
              No tasks to show.
            </p>
          )}
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;

