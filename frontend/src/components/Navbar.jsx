import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            📚 Study Buddy
          </Link>
          <div className="flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition-colors font-medium">
              Home
            </Link>
            <Link to="/students" className="hover:text-blue-200 transition-colors font-medium">
              Students
            </Link>
            <Link to="/subjects" className="hover:text-blue-200 transition-colors font-medium">
              Subjects
            </Link>
            <Link to="/tutors" className="hover:text-blue-200 transition-colors font-medium">
              Tutors
            </Link>
            <Link to="/study-sessions" className="hover:text-blue-200 transition-colors font-medium">
              Study Sessions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
