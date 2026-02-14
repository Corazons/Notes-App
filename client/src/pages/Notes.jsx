import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CreateNoteModal from "../components/CreateNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import { LogOut, Plus, NotebookPen, Trash2, Edit } from "lucide-react";
import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import { getAllNotes, deleteNote} from "../services/noteService";

export default function NotesDashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const username = user;
  const firstWordInUsername = username ? username.substring(0,1) : "";

  useEffect(() => {
    if (loading) return; 

    async function fetchData(){
      try{
        const getNotes = await getAllNotes();
        setNotes(getNotes);
      }catch(e){
        console.error(e);
      }
    }

  fetchData()
  }, [loading]);


  const handleAddNote = (note) => {
    setNotes((prev) => [note, ...prev]);
    console.log("ini notes: "+ notes);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (updatedNote) => {
    setNotes(prev =>
      prev.map(note =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
  };

  const logOut = () =>{
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <NotebookPen className="h-6 w-6 text-indigo-600" />
          Note App
        </div>

        {/* Profile */}
        <div className="relative">
          {username}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold"
          >
            {firstWordInUsername}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-md border">
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => logOut()}
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
          <button 
            onClick={() => setOpen(true)} 
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> New Note
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((note) => (
              <div
                key={note._id}
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

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  {/* Edit Button */}
                  <button
                   onClick={() => {
                      setEditingNote(note);
                      setEditOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Edit<Edit />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Delete<Trash2 />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
      <CreateNoteModal
          open={open}
          onClose={() => setOpen(false)}
          onCreated={handleAddNote}
      />
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setTimeout(() => setEditingNote(null), 300); 
            // delay supaya animasi close selesai dulu
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
