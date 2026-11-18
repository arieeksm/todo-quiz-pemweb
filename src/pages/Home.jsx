import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Plus, Calendar, CheckCircle2 } from "lucide-react";
import TodoModal from "../components/TodoModal";

function Home({ todos, onAddTodo, onDeleteTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Helper warna badge Status
  const getStatusBadge = (status) => {
    switch (status) {
      case "done":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in progress":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-sky-100 text-sky-700 border-sky-200";
    }
  };

  // Helper warna badge Prioritas
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-blue-600 p-2 text-white shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">To-do List</h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">Kelola daftar tugas harianmu ({todos.length} tugas terdaftar)</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition cursor-pointer"
          >
            <Plus size={18} />
            Tambah Todo
          </button>
        </div>

        {/* Card Tabel Todo List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-4 pl-6 pr-4 w-1/3">Judul</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Prioritas</th>
                  <th className="py-4 px-4">Deadline</th>
                  <th className="py-4 pl-4 pr-6 text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {todos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400">
                      Belum ada tugas. Klik <span className="font-semibold text-slate-600">"Tambah Todo"</span> untuk
                      mulai mencatat.
                    </td>
                  </tr>
                ) : (
                  todos.map((todo) => (
                    <tr key={todo.id} className="group hover:bg-blue-50/40 transition-colors">
                      <td
                        className="py-4 pl-6 pr-4 font-semibold text-slate-900 max-w-[240px] truncate"
                        title={todo.title}
                      >
                        {todo.title}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusBadge(
                            todo.status,
                          )}`}
                        >
                          {todo.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getPriorityBadge(
                            todo.priority,
                          )}`}
                        >
                          {todo.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          <span>{todo.deadline}</span>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/todo/${todo.id}`)}
                            title="Lihat Detail"
                            className="rounded-lg bg-blue-600 p-2 text-white shadow-xs hover:bg-blue-700 active:scale-95 transition cursor-pointer"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => onDeleteTodo(todo.id)}
                            title="Hapus Tugas"
                            className="rounded-lg bg-rose-600 p-2 text-white shadow-xs hover:bg-rose-700 active:scale-95 transition cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Tambah Todo */}
        <TodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={onAddTodo} />
      </div>
    </div>
  );
}

export default Home;
