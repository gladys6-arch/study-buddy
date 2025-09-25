import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./pages/Students";
import Tutors from "./pages/Tutors";
import Subjects from "./pages/Subjects";
import StudySessions from "./pages/StudySessions";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <Router>
      
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
    </Router>
  );
}

export default App;



