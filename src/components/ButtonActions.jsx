import React from 'react';

function ButtonActions({ comment, onActivate, onBlock, onDelete }) {
  return (
    <div className="actions">
      <button className="activate" onClick={() => onActivate(comment.id)}>Activar</button>
      <button className="block" onClick={() => onBlock(comment.id)}>Bloquear</button>
      <button className="delete" onClick={() => onDelete(comment.id)}>Eliminar</button>
    </div>
  );
}

export default ButtonActions;