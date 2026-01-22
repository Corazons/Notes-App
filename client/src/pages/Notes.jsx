import { useState } from "react";
import { LogOut, Plus, NotebookPen } from "lucide-react";

export default function NotesDashboard() {
  const [showMenu, setShowMenu] = useState(false);

  // dummy data (nanti ganti dari API)
  const notes = [
    {
      id: 1,
      title: "JWT Refresh Token Flow",
      content: "Catatan tentang access token dan refresh token...",
      createdAt: "2026-01-21",
    },
    {
      id: 2,
      title: "Secure Notes App Idea",
      content: "Landing page, auth, dan protected routes...",
      createdAt: "2026-01-19",
    },
    {
      id: 3,
      title: "React Router Notes",
      content: "Masalah refresh dan solusi index.html",
      createdAt: "2026-01-17",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <NotebookPen className="h-6 w-6 text-indigo-600" />
          SecureNote
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold"
          >
            U
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-md border">
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => alert("Logout logic here")}
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your Notes</h1>
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            <Plus className="h-4 w-4" /> New Note
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((note) => (
              <div
                key={note.id}
                className="rounded-2xl bg-white p-5 shadow-sm hover:shadow transition"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  <span className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {note.content}
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
