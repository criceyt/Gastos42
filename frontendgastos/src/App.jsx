import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import FinancePage from "./pages/FinancePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/finances" element={<FinancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
