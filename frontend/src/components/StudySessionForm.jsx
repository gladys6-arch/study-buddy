import { useState } from "react";
import { createStudySession } from "../api/api";

export default function StudySessionForm({ onSuccess }) {
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudySession({
        duration_minutes: duration,
        notes,
      });
      setDuration("");
      setNotes("");
      if (onSuccess) onSuccess(); 
    } catch (error) {
      console.error("Error creating study session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4 mx-4 sm:mx-0">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Create Study Session</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="e.g. 60"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          placeholder="Any details about this session..."
          rows="3"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Session"}
      </button>
    </form>
  );
}