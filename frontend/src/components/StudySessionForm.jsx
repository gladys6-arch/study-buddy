import { useState, useEffect } from "react";
import { createStudySession, getStudents, getSubjects } from "../api/api";

export default function StudySessionForm({ onSuccess }) {
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsData, subjectsData] = await Promise.all([
        getStudents(),
        getSubjects()
      ]);
      setStudents(studentsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createStudySession({
        duration_minutes: duration,
        notes,
        student_id: studentId || null,
        subject_id: subjectId || null,
      });
      setDuration("");
      setNotes("");
      setStudentId("");
      setSubjectId("");
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Student (optional)</label>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="">Select a student...</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject (optional)</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="">Select a subject...</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

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