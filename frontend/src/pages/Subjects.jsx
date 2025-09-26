import { useEffect, useState } from "react";
import { getSubjects, deleteSubject, updateSubject } from "../api/api";
import SubjectForm from "../components/SubjectForm";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  function fetchSubjects() {
    getSubjects().then((data) => setSubjects(data));
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await deleteSubject(id);
        fetchSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateSubject(editingSubject.id, updatedData);
      setEditingSubject(null);
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingSubject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Subjects</h1>
          <p className="text-gray-600">Manage your study subjects</p>
        </div>

        {/* Subject Form */}
        <div className="mb-8">
          {editingSubject ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Subject</h3>
              <SubjectForm 
                initialData={editingSubject}
                onSuccess={handleUpdate}
                onCancel={handleCancelEdit}
                isEditing={true}
              />
            </div>
          ) : (
            <SubjectForm onSuccess={fetchSubjects} />
          )}
        </div>

        {/* Subjects List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Subjects</h2>
          {subjects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No subjects added yet. Add your first subject above!</p>
          ) : (
            <ul className="space-y-3">
              {subjects.map((subject) => (
                <li
                  key={subject.id}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-sm transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                        Subject #{subject.id}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(subject)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(subject.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
