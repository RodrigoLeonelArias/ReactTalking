import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const isLoggedIn= !!localStorage.getItem('token'); // << La siguiente funcionalidad chequea si el administrador esta logueado
  return (
    <Router>
      <Routes>
        <Route path="/" element= {isLoggedIn ? <Navigate to= "/dashboard"/>: <Login/>}/>
        <Route path= "/dashboard/*" element= {isLoggedIn ? <Dashboard/> : <Navigate to= "/"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
