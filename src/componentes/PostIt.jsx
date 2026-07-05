import React from 'react';
import PropTypes from 'prop-types';

export function PostIt({ nota, eliminarNota }) {
  // Le agregamos la clase "important" si la nota tiene esa propiedad en true
  return (
    <div className={`post-it ${nota.importante ? 'important' : ''}`}>
      <button 
        className="delete-btn" 
        onClick={() => eliminarNota(nota.id)}
        aria-label="Eliminar nota"
      >
        x
      </button>
      <h3>{nota.titulo}</h3>
      <p>{nota.descripcion}</p>
    </div>
  );
}

PostIt.propTypes = {
  nota: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    titulo: PropTypes.string,
    descripcion: PropTypes.string.isRequired,
    importante: PropTypes.bool
  }).isRequired,
  eliminarNota: PropTypes.func.isRequired
};
