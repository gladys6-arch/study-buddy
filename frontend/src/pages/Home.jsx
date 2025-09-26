import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Study <span className="text-indigo-600">Buddy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your comprehensive platform for managing students, tutors, subjects, and study sessions. 
              Connect, learn, and grow together in one seamless experience.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/students"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/tutors"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
              >
                Find Tutors
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Manage your entire learning ecosystem in one place</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/students" className="group">
              <div className="bg-green-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Students</h3>
                <p className="text-gray-600">Manage student registrations and profiles</p>
              </div>
            </Link>
            
            <Link to="/tutors" className="group">
              <div className="bg-purple-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl mb-4">👨🏫</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tutors</h3>
                <p className="text-gray-600">Connect with experienced tutors</p>
              </div>
            </Link>
            
            <Link to="/subjects" className="group">
              <div className="bg-blue-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Subjects</h3>
                <p className="text-gray-600">Organize and manage study subjects</p>
              </div>
            </Link>
            
            <Link to="/study-sessions" className="group">
              <div className="bg-orange-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sessions</h3>
                <p className="text-gray-600">Schedule and track study sessions</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Study Subjects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}