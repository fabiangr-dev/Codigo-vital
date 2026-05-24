import React, { useState, useEffect } from 'react';
import CartaQuiz from './CartaQuiz';
import './DrawMode.css';

function DrawMode({ cartas, cardType, onCardTypeChange, onAnswerQuestion, onBack, progress }) {
  const [currentCarta, setCurrentCarta] = useState(null);
  const [filteredCartas, setFilteredCartas] = useState([]);
  const [answered, setAnswered] = useState(false);

  // Actualizar cartas filtradas según el tipo
  useEffect(() => {
    let filtered;
    if (cardType === 'all') {
      filtered = cartas;
    } else if (cardType === 'azul') {
      filtered = cartas.filter(c => c.tipo === 'azul');
    } else {
      filtered = cartas.filter(c => c.tipo === 'roja');
    }
    setFilteredCartas(filtered);
    setCurrentCarta(null);
    setAnswered(false);
  }, [cartas, cardType]);

  // Sacar una carta aleatoria
  const drawCard = () => {
    if (filteredCartas.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredCartas.length);
    setCurrentCarta(filteredCartas[randomIndex]);
    setAnswered(false);
  };

  const handleAnswer = (isCorrect) => {
    if (currentCarta) {
      onAnswerQuestion(currentCarta.id, isCorrect);
      setAnswered(true);
    }
  };

  const handleTypeChange = (type) => {
    onCardTypeChange(type);
  };

  const answered_count = Object.keys(progress.completedQuestions).length;
  const correct = Object.values(progress.scores).filter(s => s === 1).length;
  const accuracy = answered_count > 0 ? ((correct / answered_count) * 100).toFixed(1) : 0;

  return (
    <div className="draw-container">
      <div className="draw-header">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h1 className="draw-title">Modo Draw</h1>
        <div className="draw-stats">
          <span>{answered_count} sacadas</span>
          <span>{accuracy}% precisión</span>
        </div>
      </div>

      <div className="draw-content">
        <div className="type-selector">
          <button 
            className={`type-btn ${cardType === 'all' ? 'active' : ''}`}
            onClick={() => handleTypeChange('all')}
          >
            Todas las Cartas
          </button>
          <button 
            className={`type-btn blue ${cardType === 'azul' ? 'active' : ''}`}
            onClick={() => handleTypeChange('azul')}
          >
            🔵 Cartas Azules (Riesgo Leve)
          </button>
          <button 
            className={`type-btn red ${cardType === 'roja' ? 'active' : ''}`}
            onClick={() => handleTypeChange('roja')}
          >
            🔴 Cartas Rojas (Riesgo Crítico)
          </button>
        </div>

        <div className="draw-area">
          {!currentCarta ? (
            <div className="draw-empty">
              <div className="card-deck-icon">🃏</div>
              <p>Saca una carta del mazo</p>
              <p className="cards-available">
                {filteredCartas.length} cartas disponibles
              </p>
            </div>
          ) : (
            <>
              <div className="draw-card-wrapper">
                <CartaQuiz 
                  carta={currentCarta}
                  onAnswer={handleAnswer}
                  answered={answered}
                  isCorrect={progress.completedQuestions[currentCarta.id]}
                  attempt={progress.attempts[currentCarta.id] || 0}
                />
              </div>
            </>
          )}
        </div>

        <div className="draw-actions">
          {!currentCarta ? (
            <button className="draw-button primary" onClick={drawCard}>
              Sacar Carta 🎴
            </button>
          ) : (
            <>
              <button 
                className="draw-button secondary"
                onClick={() => setCurrentCarta(null)}
                disabled={!answered}
              >
                Siguiente Carta
              </button>
              <button 
                className="draw-button primary"
                onClick={drawCard}
              >
                Sacar Otra Carta 🎴
              </button>
            </>
          )}
        </div>

        <div className="draw-info">
          <div className="info-card">
            <span className="info-label">Mazo Actual</span>
            <span className="info-value">{filteredCartas.length}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Sacadas</span>
            <span className="info-value">{answered_count}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Correctas</span>
            <span className="info-value" style={{ color: '#10b981' }}>{correct}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Precisión</span>
            <span className="info-value">{accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawMode;
