import { useEffect, useState } from "react";
import { getTutors, deleteTutor, updateTutor } from "../api/api";
import TutorForm from "../components/TutorForm";
import TutorSubjectAssignment from "../components/TutorSubjectAssignment";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [editingTutor, setEditingTutor] = useState(null);

  useEffect(() => {
    fetchTutors();
  }, []);

  function fetchTutors() {
    getTutors()
      .then((data) => {
        console.log('Tutors data:', data);
        setTutors(data);
      })
      .catch((error) => {
        console.error('Error fetching tutors:', error);
      });
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tutor?')) {
      try {
        await deleteTutor(id);
        fetchTutors();
      } catch (error) {
        console.error('Error deleting tutor:', error);
      }
    }
  };

  const handleEdit = (tutor) => {
    setEditingTutor(tutor);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateTutor(editingTutor.id, updatedData);
      setEditingTutor(null);
      fetchTutors();
    } catch (error) {
      console.error('Error updating tutor:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTutor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tutors</h1>
          <p className="text-gray-600">Connect with experienced tutors</p>
        </div>

        {/* Tutor Form */}
        <div className="mb-10">
          {editingTutor ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Tutor</h3>
              <TutorForm 
                initialData={editingTutor}
                onSuccess={handleUpdate}
                onCancel={handleCancelEdit}
                isEditing={true}
              />
            </div>
          ) : (
            <TutorForm onSuccess={fetchTutors} />
          )}
        </div>

        {/* Subject Assignment */}
        <TutorSubjectAssignment onSuccess={fetchTutors} />

        {/* Tutors List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="bg-purple-100 p-2 rounded-lg mr-3">
              👨‍🏫
            </span>
            Available Tutors
          </h2>
          {tutors.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-lg">No tutors available yet. Add the first tutor above!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {tutor.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {tutor.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{tutor.email}</p>
                      {tutor.subjects && tutor.subjects.length > 0 && (
                        <div className="mb-2">
                          <span className="text-xs text-gray-500">Subjects: </span>
                          <span className="text-xs text-purple-600">{tutor.subjects.join(", ")}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full w-fit">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          Available
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(tutor)}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tutor.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
