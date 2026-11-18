import { useState } from "react";

function TodoModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "to-do");
  const [priority, setPriority] = useState(initialData?.priority || "low");
  const [deadline, setDeadline] = useState(initialData?.deadline || "");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      alert("Judul dan Deadline wajib diisi!");
      return;
    }

    onSubmit({
      ...(initialData && { id: initialData.id }),
      title,
      description,
      status,
      priority,
      deadline,
    });

    if (!initialData) {
      setTitle("");
      setDescription("");
      setStatus("to-do");
      setPriority("low");
      setDeadline("");
    }
    onClose();
  };

  const isEditMode = Boolean(initialData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900">
          {isEditMode ? "Update Todo" : "Tambah Todo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">Deskripsi</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-800">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="to-do">To-do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-800">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
            >
              {isEditMode ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
