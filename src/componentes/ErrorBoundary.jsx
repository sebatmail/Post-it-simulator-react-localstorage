import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <div className="container py-4 text-white">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Se produjo un error.</h4>
            <p className="mb-1">Lo sentimos, algo salió mal mostrando este componente.</p>
            <button className="btn btn-sm btn-outline-light mt-3" onClick={this.handleRetry}>
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
