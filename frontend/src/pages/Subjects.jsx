import { useEffect, useState } from "react";
import { getSubjects } from "../api/api";
import SubjectForm from "../components/SubjectForm";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  function fetchSubjects() {
    getSubjects().then((data) => setSubjects(data));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Subjects</h1>
          <p className="text-gray-600">Manage your study subjects</p>
        </div>

        {/* Subject Form */}
        <div className="mb-8">
          <SubjectForm onSuccess={fetchSubjects} />
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
                    <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
                      Subject #{subject.id}
                    </span>
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
