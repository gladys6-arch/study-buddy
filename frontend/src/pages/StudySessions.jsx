import { useEffect, useState } from "react";
import { getStudySessions } from "../api/api";
import StudySessionForm from "../components/StudySessionForm";

export default function StudySessions() {
  const [sessions, setSessions] = useState([]);

  const loadSessions = async () => {
    const data = await getStudySessions();
    setSessions(data);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study Sessions</h1>

      <StudySessionForm onSuccess={loadSessions} />

      <ul className="space-y-2">
        {sessions.map((s) => (
          <li
            key={s.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p><span className="font-semibold">Student:</span> {s.studentId}</p>
              <p><span className="font-semibold">Subject:</span> {s.subjectId}</p>
              <p><span className="font-semibold">Tutor:</span> {s.tutorId}</p>
              <p><span className="font-semibold">Date:</span> {s.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
