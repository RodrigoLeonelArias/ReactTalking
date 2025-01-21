import '../styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Users(){
    const [ users, setUsers] = useState([]);

    useEffect(()=> {
        axios.get('/api/users').then((response) => setUsers(response.data));

    }, []);

    const handleActivate= (id) => {
        axios.put('/api/users/${id}/activate').then(()=>{
            setUsers(users.map(user => user.id === id ?{...user, active: true}:user));
        });
    };

    const handleBlock= (id) => {
        axios.delete('/api/users/${id}').then(()=>{
            setUsers(users.map(user => user.id === id ?{...user, active: false}: user));
        });
    
    const handleDelete= (id) => {
        axios.delete('/api/users/${id}').then(() => {
            setUsers(users.filter(user => user.id !== id));
        });
    };
    return (
        <div className="list-container">
            <h2>Gestion de Usuarios</h2>
            {users.map((user)=>
                <div className="list-item" key= {user.id}>
                    <span>{user.name}-{user.active ? 'Activo': 'Bloqueado'}</span>
                    <div>
                        <button className="activate" onClick={()=> handleActivate(user.id)}>Activar</button>
                        <button className="block" onClick={()=> handleActivate(user.id)}>Bloquear</button>
                        <button className="delete" onClick={()=> handleActivate(user.id)}>Eliminar</button>
                    </div>
                </div>
            )}
        </div>
    );
    }};

export default Users;