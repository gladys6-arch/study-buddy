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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Subjects</h1>

      {/* Subject Form */}
      <SubjectForm onSuccess={fetchSubjects} />

      {/* Subjects List */}
      <ul className="space-y-2">
        {subjects.map((subject) => (
          <li
            key={subject.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>{subject.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
