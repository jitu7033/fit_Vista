
import { Routes, Route } from 'react-router-dom';
import LandingPage from './assets/pages/LandingPage';
import Signup from './assets/pages/Signup';
import PushUp from './assets/pages/PushUp';
import SitUps from './assets/pages/SitUps';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Leaderboard from './assets/pages/LeaderBoard';
import Register from './pages/Register.jsx';
export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pushup" element={<PushUp/>}/>
        <Route path="/situps" element={<SitUps/>}/>
        <Route path="/leaderboards" element={<Leaderboard/>}/>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
