import '../styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Users() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:5000/users")
        .then(response => setUsers(response.data))
        .catch(error => console.error("Error al obtener usuarios:", error));
    }, []);
  
    const handleActivate = (id) => {
      console.log(`Activar usuario con ID: ${id}`);
      // Lógica para activar usuario
    };
  
    const handleBlock = (id) => {
      console.log(`Bloquear usuario con ID: ${id}`);
      // Lógica para bloquear usuario
    };
  
    const handleDelete = (id) => {
      console.log(`Eliminar usuario con ID: ${id}`);
      // Lógica para eliminar usuario
    };
  
    return (
      <div className="list-container">
        <h2>Gestión de Usuarios</h2>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="list-item" key={user.id}>
              <span>{user.name} - {user.active ? "Activo" : "Bloqueado"}</span>
              <div>
                <button className="activate" onClick={() => handleActivate(user.id)}>Activar</button>
                <button className="block" onClick={() => handleBlock(user.id)}>Bloquear</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>
    );
  }
  
  export default Users;