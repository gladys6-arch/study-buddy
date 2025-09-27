import { useState, useEffect } from "react";
import { createSubject } from "../api/api";

export default function SubjectForm({ onSuccess, initialData, onCancel, isEditing }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await onSuccess({ name });
      } else {
        await createSubject({ name });
        setName("");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Error with subject:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4 mx-4 sm:mx-0"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        {isEditing ? "Edit Subject" : "Add Subject"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Subject name"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 flex-1 sm:flex-none"
        >
          {loading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Subject" : "Add Subject")}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex-1 sm:flex-none"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}