
import { useNavigate } from "react-router-dom";


function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
          Welcome to Study Buddy 🎓
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Study Buddy is your all-in-one platform to manage students, tutors, 
          subjects, and study sessions with ease. Whether you’re a student trying 
          to organize your schedule, a tutor managing multiple classes, or an 
          administrator keeping track of everything — Study Buddy helps you stay 
          productive and connected.
        </p>
        <p className="text-md text-gray-600">
          Use the navigation above to explore students, tutors, subjects, and study 
          sessions. Get started today and simplify the way you learn and teach!
        </p>
      </div>
    </div>
  );
}

export default Home;

