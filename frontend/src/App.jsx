import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Tutors from "./pages/Tutors";
import Subjects from "./pages/Subjects";
import StudySessions from "./pages/StudySessions";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/study-sessions" element={<StudySessions />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
