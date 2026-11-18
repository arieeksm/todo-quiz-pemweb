import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Calendar, Flag, Activity } from "lucide-react";
import TodoModal from "../components/TodoModal";

function TodoDetail({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todo = todos.find((item) => String(item.id) === String(id));

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-lg font-semibold text-slate-700">Tugas tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Kolom Kiri: Judul & Deskripsi */}
          <div className="space-y-5 md:col-span-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Judul Tugas</span>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{todo.title}</h2>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi</span>
              <div className="mt-2 min-h-[120px] rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-relaxed text-slate-700">
                {todo.description || "Tidak ada deskripsi tambahan."}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Info Metadata & Tombol */}
          <div className="flex flex-col justify-between space-y-6 border-t border-slate-100 pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Activity size={13} />
                  <span>Status</span>
                </div>
                <p className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold capitalize text-amber-800">
                  {todo.status}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Flag size={13} />
                  <span>Prioritas</span>
                </div>
                <p className="mt-1 inline-block rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold capitalize text-slate-800">
                  {todo.priority}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Calendar size={13} />
                  <span>Deadline</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-800">{todo.deadline}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 py-2.5 text-xs font-semibold text-white hover:bg-rose-700 active:scale-95 transition cursor-pointer"
              >
                <ArrowLeft size={13} />
                Kembali
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 active:scale-95 transition cursor-pointer"
              >
                <Pencil size={13} />
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update Todo */}
      <TodoModal
        key={todo.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onUpdateTodo}
        initialData={todo}
      />
    </div>
  );
}

export default TodoDetail;
