import { useEffect, useState } from "react";
import { getStudents, createStudent } from "../api/api";   
import StudentForm from "../components/StudentForm";

export default function Students() {
  const [students, setStudents] = useState([]);

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add student
  const handleCreate = async (student) => {
    try {
      await createStudent(student);
      fetchStudents(); 
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Students</h1>
          <p className="text-gray-600">Manage student registrations</p>
        </div>

        
        <div className="mb-10">
          
          <StudentForm onSuccess={handleCreate} />
        </div>

        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="bg-green-100 p-2 rounded-lg mr-3">🎓</span>
            Enrolled Students
          </h2>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-gray-500 text-lg">
                No students enrolled yet. Add the first student above!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    
                    <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {student.name.charAt(0).toUpperCase()}
                    </div>

                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {student.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {student.email}
                      </p>
                      <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full w-fit">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Active
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
