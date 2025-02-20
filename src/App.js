import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Posts from './components/Post';
import Comments from './components/Comments';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />

      
        <Route path="/dashboard/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}>
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="comments" element={<Comments />} />
        </Route>

      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;