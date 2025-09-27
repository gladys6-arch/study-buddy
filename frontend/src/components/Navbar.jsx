import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-blue-200 transition-colors">
            📚 Study Buddy
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
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
              Sessions
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/students" 
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Students
              </Link>
              <Link 
                to="/subjects" 
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Subjects
              </Link>
              <Link 
                to="/tutors" 
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Tutors
              </Link>
              <Link 
                to="/study-sessions" 
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sessions
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
