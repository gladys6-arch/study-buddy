import { useEffect, useState } from "react";
import { getStudySessions } from "../api/api";
import StudySessionForm from "../components/StudySessionForm";

export default function StudySessions() {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  const loadSessions = async () => {
    try {
      const data = await getStudySessions();
      setSessions(data);
      setError(null); // clear previous errors if successful
    } catch (err) {
      console.error("Failed to fetch study sessions:", err);
      setError("Could not load study sessions. Please try again later.");
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study Sessions</h1>

      <StudySessionForm onSuccess={loadSessions} />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-2">
        {sessions.map((s) => (
          <li
            key={s.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p>
                <span className="font-semibold">Student:</span>{" "}
                {s.student?.name || s.studentId}
              </p>
              <p>
                <span className="font-semibold">Subject:</span>{" "}
                {s.subject?.name || s.subjectId}
              </p>
              <p>
                <span className="font-semibold">Tutor:</span>{" "}
                {s.tutor?.name || s.tutorId}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(s.date).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
