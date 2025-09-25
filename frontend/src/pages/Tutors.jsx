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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tutors</h1>

      {/* Tutor Form */}
      <TutorForm onSuccess={fetchTutors} />

      {/* Tutor List */}
      <ul className="space-y-2">
        {tutors.map((tutor) => (
          <li
            key={tutor.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              {tutor.name} ({tutor.email})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
