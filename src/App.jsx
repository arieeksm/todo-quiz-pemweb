import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/dummyTodos";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

function App() {
  const [todos, setTodos] = useState(initialTodos);

  // Fungsi Tambah Tugas
  const addTodo = (newTodo) => {
    const todoWithId = {
      ...newTodo,
      id: Date.now(), // Generate ID unik otomatis
    };
    setTodos((prevTodos) => [...prevTodos, todoWithId]);
  };

  // Fungsi Update Tugas
  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  // Fungsi Hapus Tugas (dengan konfirmasi sesuai ketentuan soal)
  const deleteTodo = (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus tugas ini?");
    if (isConfirmed) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-800">
        <Routes>
          <Route path="/" element={<Home todos={todos} onAddTodo={addTodo} onDeleteTodo={deleteTodo} />} />
          <Route path="/todo/:id" element={<TodoDetail todos={todos} onUpdateTodo={updateTodo} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
