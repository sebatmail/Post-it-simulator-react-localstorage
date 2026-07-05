import React, { useState, useEffect } from 'react';
import { PostItForm } from './PostItForm';
import { PostIt } from './PostIt';
import { ErrorBoundary } from './ErrorBoundary';

export function PostItApp() {
  const CLAVE = 'notas_react';

  // Usamos inicialización perezosa (lazy init) para leer localStorage de forma segura 
  // antes de renderizar, evitando que los valores por defecto sobreescriban lo guardado.
  const [notas, setNotas] = useState(() => {
    try {
      const guardadas = localStorage.getItem(CLAVE);
      if (guardadas && guardadas !== 'undefined') {
        const parseadas = JSON.parse(guardadas);
        if (Array.isArray(parseadas) && parseadas.length > 0) {
          return parseadas;
        }
      }
    } catch (error) {
      console.warn('No se pudieron cargar las notas guardadas:', error);
    }
    
    // Si no hay nada guardado, cargamos los Post-Its por defecto
    return [
      { id: 1, titulo: "Subir las notas", descripcion: "Antes de fin de\nsemestre", importante: false },
      { id: 2, titulo: "Regar las plantas", descripcion: "Dia por medio", importante: true },
      { id: 3, titulo: "Renovar Tarjeta", descripcion: "Antes de fin de mes\nque se esta por\nvencer.", importante: false },
      { id: 4, titulo: "Cambiar Aceite\nAuto", descripcion: "Preguntar a mi viejo\ndonde lo llevo.", importante: true },
      { id: 5, titulo: "Comprar Regalo", descripcion: "Buscar el fin de\nsemana para que\nllegue", importante: false },
      { id: 6, titulo: "Subir Material", descripcion: "Comprimir y subir los\ntutoriales", importante: false },
      { id: 7, titulo: "Ordenar 3er Piso", descripcion: "Mueble de las consolas", importante: false },
      { id: 8, titulo: "Ir al Aeropuerto", descripcion: "Proximo Miercoles 13\nhrs", importante: true }
    ];
  });

  // Guardar en localStorage cada vez que el estado 'notas' cambie
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(notas));
    } catch (error) {
      console.warn('No se pudieron guardar las notas:', error);
    }
  }, [notas]);

  const agregarNota = (nota) => {
    setNotas([...notas, nota]);
  };

  const eliminarNota = (id) => {
    const nuevasNotas = notas.filter((n) => n.id !== id);
    setNotas(nuevasNotas);
  };

  return (
    <ErrorBoundary>
      <div>
        <div className="barra-superior">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-12 col-md-3">
                <h1 style={{ color: 'white', fontFamily: 'Arial, sans-serif', paddingLeft: '20px' }}>
                  Post It Simulator!
                </h1>
              </div>
              <div className="col-12 col-md-9">
                <PostItForm agregarNota={agregarNota} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-fluid post-it-board">
          <div className="row">
            {notas.map((nota) => (
              <div className="col-12 col-lg-3" key={nota.id}>
                <PostIt nota={nota} eliminarNota={eliminarNota} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
