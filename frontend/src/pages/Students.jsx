import { useEffect, useState } from "react";
import { getStudents } from "../api/api";
import StudentForm from "../components/StudentForm";

export default function Students() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Students</h1>
      <StudentForm onSuccess={fetchStudents} />
      <ul className="list-disc pl-6">
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
