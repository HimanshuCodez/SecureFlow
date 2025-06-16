import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to SecureFlow
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-6">
          A secure, reliable and user-friendly authentication system for your next project.
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Get Started
          <ArrowRight size={20} />
        </a>
      </div>
    </header>
  );
}
