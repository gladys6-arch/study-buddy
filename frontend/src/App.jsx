import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Tutors from "./pages/Tutors";
import Subjects from "./pages/Subjects";
import StudySessions from "./pages/StudySessions";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/study-sessions" element={<StudySessions />} />
          <Route path="*" element={<div className="p-4 sm:p-10 text-center">Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}