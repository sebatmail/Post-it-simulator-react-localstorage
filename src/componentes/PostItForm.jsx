import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export function PostItForm({ agregarNota }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [importante, setImportante] = useState(false);
  const [error, setError] = useState('');

  const descripcionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descripcion.trim() === '') {
      setError('La descripción es obligatoria');
      descripcionRef.current.focus();
      return;
    }
    
    setError('');
    
    // Sanitización básica de seguridad para evitar XSS (Buena práctica)
    const safeTitulo = String(titulo).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeDescripcion = String(descripcion).replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const nuevaNota = {
      id: Date.now(), 
      titulo: safeTitulo,
      descripcion: safeDescripcion,
      importante: importante
    };

    agregarNota(nuevaNota);

    setTitulo('');
    setDescripcion('');
    setImportante(false);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2 align-items-center">
      <div className="col-12 col-md-auto">
        <input 
          type="text" 
          className="form-control input-nota" 
          placeholder="Titulo" 
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          aria-label="Título de la nota"
        />
      </div>
      <div className="col-12 col-md-auto position-relative">
        <input 
          type="text" 
          className="form-control input-nota" 
          placeholder="Descripcion" 
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          ref={descripcionRef}
          aria-label="Descripción de la nota"
          aria-invalid={error !== ''}
          aria-describedby={error ? "descripcion-error" : undefined}
        />
        {/* Mensaje de error accesible con ARIA */}
        {error && (
          <span 
            id="descripcion-error"
            role="alert" 
            aria-live="assertive"
            aria-atomic="true"
            style={{color: '#ffcccc', fontSize: '14px', position: 'absolute', bottom: '-22px', left: '10px', whiteSpace: 'nowrap'}}
          >
            {error}
          </span>
        )}
      </div>
      <div className="col-12 col-md-auto">
        <div className="form-check text-white ms-2 d-flex align-items-center gap-2">
          <input 
            className="form-check-input mt-0" 
            type="checkbox" 
            id="chkImportante"
            checked={importante}
            onChange={(e) => setImportante(e.target.checked)}
            aria-label="Marcar como nota importante"
          />
          <label className="form-check-label" htmlFor="chkImportante">
            Importante!
          </label>
        </div>
      </div>
      <div className="col-12 col-md-auto ms-md-3">
        <button type="submit" className="btn btn-dark w-100 btn-agregar">AGREGAR</button>
      </div>
    </form>
  );
}

PostItForm.propTypes = {
  agregarNota: PropTypes.func.isRequired
};
