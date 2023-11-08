import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      if (!todos.some((todoItem) => todoItem.text === newTodo)) {
        const updatedTodos = [...todos, { text: newTodo, completed: false }];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setNewTodo("");
        setError(""); // Clear any previous error
      } else {
        setError("Todo already exists");
      }
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">To Do List</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className="flex-1 border rounded p-2"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
              setError(""); // Clear error when user types
            }}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              } flex items-center justify-between mb-2`}
            >
              <span
                onClick={() => toggleTodo(index)}
                className="cursor-pointer"
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(index)}
                className="text-red-500 font-bold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
