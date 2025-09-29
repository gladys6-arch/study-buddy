import { useState, useEffect } from "react";
import { getSubjects, getTutors } from "../api/api";
import axios from "axios";

export default function TutorSubjectAssignment({ onSuccess }) {
  const [tutors, setTutors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tutorsData, subjectsData] = await Promise.all([
        getTutors(),
        getSubjects()
      ]);
      setTutors(tutorsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedTutor || !selectedSubject) return;

    setLoading(true);
    try {
      await axios.put(`https://study-buddy-3bdu.onrender.com/api/subjects/${selectedSubject}`, {
        tutor_id: parseInt(selectedTutor)
      });
      
      setSelectedTutor("");
      setSelectedSubject("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error assigning subject:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Assign Subject to Tutor</h3>
      
      <form onSubmit={handleAssign} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tutor</label>
          <select
            value={selectedTutor}
            onChange={(e) => setSelectedTutor(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          >
            <option value="">Select a tutor...</option>
            {tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          >
            <option value="">Select a subject...</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedTutor || !selectedSubject}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Assigning..." : "Assign"}
        </button>
      </form>
    </div>
  );
}