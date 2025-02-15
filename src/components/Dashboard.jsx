import '../styles.css';
import { Link, Route, Routes } from 'react-router-dom';
import Users from './Users';
import Posts from './Post';
import Comments from './Comments'

function Dashboard(){
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'
    };

    return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Herramientas de Administración</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <div className="dashboard-nav">
        <Link to="users">Usuarios</Link> | <Link to="posts">Posteos</Link> |{' '}
        <Link to="comments">Comentarios</Link>
      </div>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </div>
        
    );
}

export default Dashboard;