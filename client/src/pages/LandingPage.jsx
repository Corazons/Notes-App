import { Lock, ShieldCheck, NotebookPen } from "lucide-react";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white text-gray-800">

      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <NotebookPen className="h-6 w-6 text-indigo-600" />
          NoteAPP
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your private notes.
            <br />
            <span className="text-indigo-600">Encrypted & Secure.</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            SecureNote helps you store personal thoughts, ideas, and sensitive
            information safely. Only you can access your notes.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative w-80 h-80 rounded-3xl bg-indigo-50 flex items-center justify-center">
            <Lock className="h-32 w-32 text-indigo-600" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Why SecureNote?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Feature
              icon={<ShieldCheck className="h-8 w-8 text-indigo-600" />}
              title="End-to-End Security"
              description="Your notes are protected using modern authentication and secure APIs."
            />
            <Feature
              icon={<Lock className="h-8 w-8 text-indigo-600" />}
              title="Private by Default"
              description="Only authenticated users can access their own notes."
            />
            <Feature
              icon={<NotebookPen className="h-8 w-8 text-indigo-600" />}
              title="Simple & Focused"
              description="Minimal interface designed for writing without distractions."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold">Start writing securely today</h2>
          <p className="mt-4 text-gray-600">
            Create your free account and keep your notes safe in one place.
          </p>
          <Link
            to="/register"
            className="inline-block mt-8 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="border-t py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NoteApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}
