import '../styles.css';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Herramientas de Administración</h1>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <div className="dashboard-nav">
                <Link to="/dashboard/users">Usuarios</Link> | 
                <Link to="/dashboard/posts">Posteos</Link> | 
                <Link to="/dashboard/comments">Comentarios</Link>
            </div>
            <div className="dashboard-content">
                <Outlet /> 
            </div>
        </div>
    );
}

export default Dashboard;