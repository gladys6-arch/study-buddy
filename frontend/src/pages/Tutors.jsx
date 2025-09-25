import { useEffect, useState } from "react";
import { getTutors } from "../api/api";
import TutorForm from "../components/TutorForm";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetchTutors();
  }, []);

  function fetchTutors() {
    getTutors().then((data) => setTutors(data));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tutors</h1>
          <p className="text-gray-600">Connect with experienced tutors</p>
        </div>

        {/* Tutor Form */}
        <div className="mb-10">
          <TutorForm onSuccess={fetchTutors} />
        </div>

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
                      <div className="flex items-center text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full w-fit">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Available
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
