import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Room from "./components/Room";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:roomId" element={<Room />} />
      </Routes>
    </Router>
  );
}
