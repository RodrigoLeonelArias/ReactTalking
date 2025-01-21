import '../styles.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts').then((response) => setPosts(response.data));
  }, []);

  const handleActivate = (id) => {
    axios.put(`/api/posts/${id}/activate`).then(() => {
      setPosts(posts.map(post => post.id === id ? { ...post, active: true } : post));
    });
  };

  const handleBlock = (id) => {
    axios.put(`/api/posts/${id}/block`).then(() => {
      setPosts(posts.map(post => post.id === id ? { ...post, active: false } : post));
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`).then(() => {
      setPosts(posts.filter(post => post.id !== id));
    });
  };

  return (
    <div className="list-container">
      <h2>Gestión de Posteos</h2>
      {posts.map((post) => (
        <div className="list-item" key={post.id}>
          <span>{post.title} - {post.active ? 'Activo' : 'Bloqueado'}</span>
          <div>
            <button className="activate" onClick={() => handleActivate(post.id)}>Activar</button>
            <button className="block" onClick={() => handleBlock(post.id)}>Bloquear</button>
            <button className="delete" onClick={() => handleDelete(post.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;