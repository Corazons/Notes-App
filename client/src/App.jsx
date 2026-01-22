import { Routes, Route } from "react-router";
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import NotesDashboard from "./pages/Notes";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Notes" element={<NotesDashboard />} />
    </Routes>
  )
}

export default App
