import '../styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonActions from './ButtonActions';  // Importar el componente ButtonActions

function Posts() { 
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts") 
      .then(response => setPosts(response.data)) // Corregido setPost a setPosts
      .catch(error => console.error("Error al obtener posteos:", error));
  }, []);

  const handleActivate = (id) => {
    axios.patch(`http://localhost:5000/posts/${id}`, { active: true }).then(() => {
      setPosts(posts.map(post => 
        post.id === id ? { ...post, active: true } : post
      ));
    }).catch(error => console.error("Error al activar post:", error));
  };

  const handleBlock = (id) => {
    axios.patch(`http://localhost:5000/posts/${id}`, { active: false }).then(() => {
      setPosts(posts.map(post => 
        post.id === id ? { ...post, active: false } : post
      ));
    }).catch(error => console.error("Error al bloquear post:", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`).then(() => {
      setPosts(posts.filter(post => post.id !== id));
    }).catch(error => console.error("Error al eliminar post:", error));
  };

  return (
    <div className="list-container">
      <h2>Gestión de Posteos</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="list-item" key={post.id}>
            <span>{post.title} - {post.active ? "Activo" : "Bloqueado"}</span>
            <ButtonActions  // Usando ButtonActions
              comment={post}  // Renombrado como "comment" pero es un post
              onActivate={handleActivate}
              onBlock={handleBlock}
              onDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <p>No hay posteos disponibles.</p>
      )}
    </div>
  );
}

export default Posts;