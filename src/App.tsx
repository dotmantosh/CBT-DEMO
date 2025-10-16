import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Student from './views/Student';
import Teachers from './views/Teachers';
import Admin from './views/Admin';
import Home from './views/Home';


function App() {
  
  return (
    <Router>
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee', marginBottom: '2rem' }}>
        <div className="logo">
          OBMS CBT
        </div>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/teachers">Teachers</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student" element={<Student />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
