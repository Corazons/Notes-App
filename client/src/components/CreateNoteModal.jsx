import { useState, useEffect } from "react";
import { createNote } from "../services/noteService";

export default function CreateNoteModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const note = await createNote({ title, content });
      onCreated(note);
      setTitle("");
      setContent("");
      onClose();
    } catch {
      alert("Gagal membuat note");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`
          absolute
          w-[90%] max-w-sm
          bg-white
          rounded-2xl
          p-4
          shadow-xl
          transition-all duration-300 ease-out
          ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-full scale-95 opacity-0"}
        `}
      >
        <h2 className="text-lg font-semibold mb-3">Create Note</h2>

        <input
          className="w-full border rounded-lg p-2 mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-2 mb-3 resize-none"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}