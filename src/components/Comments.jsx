import '../styles.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonActions from './ButtonActions';  // Nuevo nombre importado

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/comments')
      .then(response => setComments(response.data));
  }, []);

  const handleActivate = (id) => {
    axios.patch(`http://localhost:5000/comments/${id}`, { active: true })
      .then(() => {
        setComments(comments.map(comment => 
          comment.id === id ? { ...comment, active: true } : comment
        ));
      });
  };

  const handleBlock = (id) => {
    axios.patch(`http://localhost:5000/comments/${id}`, { active: false })
      .then(() => {
        setComments(comments.map(comment => 
          comment.id === id ? { ...comment, active: false } : comment
        ));
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/comments/${id}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      });
  };

  return (
    <div className="list-container">
      <h2>Gestión de Comentarios</h2>
      {comments.map((comment) => (
        <div className="list-item" key={comment.id}>
          <span>{comment.content} - {comment.active ? 'Activo' : 'Bloqueado'}</span>
          <ButtonActions 
            comment={comment} 
            onActivate={handleActivate} 
            onBlock={handleBlock} 
            onDelete={handleDelete} 
          />
        </div>
      ))}
    </div>
  );
}

export default Comments;