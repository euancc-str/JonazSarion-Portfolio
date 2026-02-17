import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import UserProfile from './UserProfile';
import FloatingProfile from './FloatingProfile';
import './App.css';

function App() {
  return (
    <>
      {/* 1. Define your Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>

      {/* 2. Floating Profile is OUTSIDE Routes so it appears on EVERY page */}
      <FloatingProfile />
    </>
  );
}

export default App;