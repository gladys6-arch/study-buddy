import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
        Welcome to Study Buddy 🎓
      </h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Study Buddy is your all-in-one platform for managing students, tutors, 
        subjects, and study sessions. Whether you’re a teacher keeping track 
        of classes, a tutor scheduling sessions, or a student looking to stay 
        organized — this app helps you streamline everything in one place.
      </p>

      <p className="text-gray-600 mb-8">
        Use the navigation above to explore students, subjects, tutors, 
        or jump straight into planning your study sessions. Start building 
        a smarter and more organized study experience today!
      </p>

      <button
        onClick={() => navigate("/students")}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        View Students
      </button>
    </div>
  );
}
