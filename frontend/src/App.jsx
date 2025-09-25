import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import Tutors from "./pages/Tutors";
import StudySessions from "./pages/StudySessions"; // <-- make sure file exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/study-sessions" element={<StudySessions />} /> {/* <-- add this */}
      </Routes>
    </Router>
  );
}

export default App;
