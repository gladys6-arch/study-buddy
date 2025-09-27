import { useState } from "react";
import { createStudent } from "../api/api";

export default function StudentForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudent({ name, email });
      setName("");
      setEmail("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4 mx-4 sm:mx-0">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Add New Student</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Student name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="student@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}