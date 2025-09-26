import React, { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent, updateStudent } from "../api/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch students on load
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  // Add student
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    await createStudent({ name: newName });
    setNewName("");
    loadStudents(); // refresh
  };

  // Delete student
  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents(); // refresh after delete
  };

  // Edit student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditName(student.name);
  };

  // Update student
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    
    await updateStudent(editingStudent.id, { name: editName });
    setEditingStudent(null);
    setEditName("");
    loadStudents();
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditName("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎓 Students</h2>

      {/* Add student form */}
      <form onSubmit={handleAdd} className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={newName}
          placeholder="Enter student name"
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add
        </button>
      </form>

      {/* List students */}
      <ul className="space-y-3">
        {students.map((s) => (
          <li
            key={s.id}
            className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm"
          >
            {editingStudent?.id === s.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span className="text-gray-800 font-medium">{s.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-600 transition"
                  >
                    ❌ Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
