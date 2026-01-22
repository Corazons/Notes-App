import { useState } from "react";
import {Input} from "../components/Input"

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
        <p className="mt-1 text-sm text-gray-500">Login to access your notes</p>

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
            placeholder="••••••••"
          />
        </div>

        <button className="mt-6 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account? <a href="/register" className="font-medium text-indigo-600">Register</a>
        </p>
      </div>
    </div>
  );
}