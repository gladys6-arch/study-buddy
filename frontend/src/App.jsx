import { Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import Tutors from "./pages/Tutors";
import StudySessions from "./pages/StudySessions";
import Home from "./pages/Home"; // <- create this if you don’t have it

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />   {/* ✅ root route */}
      <Route path="/students" element={<Students />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/tutors" element={<Tutors />} />
      <Route path="/study-sessions" element={<StudySessions />} />
    </Routes>
  );
}

export default App;

