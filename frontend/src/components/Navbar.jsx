import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex gap-6">
      <Link to="/" className="hover:text-gray-300">
        Home
      </Link>
      <Link to="/students" className="hover:text-gray-300">
        Students
      </Link>
      <Link to="/subjects" className="hover:text-gray-300">
        Subjects
      </Link>
      <Link to="/tutors" className="hover:text-gray-300">
        Tutors
      </Link>
      <Link to="/study-sessions" className="hover:text-gray-300">
        Study Sessions
      </Link>
    </nav>
  );
}
