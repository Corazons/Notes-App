import { useState } from "react";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router";
import { register } from "../services/authService";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    // ✅ validasi client
    if (!email || !password || !confirmPassword) {
      return alert("Semua field wajib diisi");
    }

    if (password.length < 8) {
      return alert("Password minimal 8 karakter");
    }

    if (password !== confirmPassword) {
      return alert("Password dan konfirmasi tidak sama");
    }

    try {
      setLoading(true);
      await register({ email, password });

      alert("Registrasi berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Registrasi gagal"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Register to start writing notes
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6 w-full rounded-xl
            bg-indigo-600 py-2.5
            text-sm font-semibold text-white
            transition hover:bg-indigo-700
            disabled:opacity-60
          "
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}