import React, { useState } from 'react';
import CartaView from './CartaView';
import './ViewMode.css';

function ViewMode({ cartas, cardType, onCardTypeChange, onBack, progress }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTypeChange = (type) => {
    onCardTypeChange(type);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < cartas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentCarta = cartas[currentIndex];

  return (
    <div className="view-mode-container">
      <div className="view-header">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h1>Ver Cartas</h1>
        <div className="view-stats">
          <span>{cartas.length} cartas</span>
        </div>
      </div>

      <div className="view-content">
        <div className="type-filter">
          <button 
            className={`filter-btn ${cardType === 'all' ? 'active' : ''}`}
            onClick={() => handleTypeChange('all')}
          >
            Todas
          </button>
          <button 
            className={`filter-btn blue ${cardType === 'azul' ? 'active' : ''}`}
            onClick={() => handleTypeChange('azul')}
          >
            Azules
          </button>
          <button 
            className={`filter-btn red ${cardType === 'roja' ? 'active' : ''}`}
            onClick={() => handleTypeChange('roja')}
          >
            Rojas
          </button>
        </div>

        {currentCarta && (
          <CartaView 
            carta={currentCarta}
            answered={progress.completedQuestions[currentCarta.id] !== undefined}
            isCorrect={progress.completedQuestions[currentCarta.id]}
            attempt={progress.attempts[currentCarta.id] || 0}
          />
        )}

        <div className="navigation">
          <button 
            className="nav-btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Anterior
          </button>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / cartas.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentIndex + 1} / {cartas.length}
          </span>
          <button 
            className="nav-btn"
            onClick={handleNext}
            disabled={currentIndex === cartas.length - 1}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewMode;
