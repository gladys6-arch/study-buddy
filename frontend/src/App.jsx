import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Tutors from "./pages/Tutors";
import Subjects from "./pages/Subjects";
import StudySessions from "./pages/StudySessions";

export default function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />

      
      <Route path="/students" element={<Students />} />

      
      <Route path="/tutors" element={<Tutors />} />

      
      <Route path="/subjects" element={<Subjects />} />

      
      <Route path="/study-sessions" element={<StudySessions />} />

      
      <Route path="*" element={<div className="p-10 text-center">Page Not Found</div>} />
    </Routes>
  );
}
