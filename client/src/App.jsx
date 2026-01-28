import { Routes, Route } from "react-router";
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import NotesDashboard from "./pages/Notes";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<NotesDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
