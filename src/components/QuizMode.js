import React, { useState, useEffect } from 'react';
import CartaQuiz from './CartaQuiz';
import './QuizMode.css';

function QuizMode({ cartas, cardType, onCardTypeChange, onAnswerQuestion, onBack, progress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCarta, setCurrentCarta] = useState(null);

  useEffect(() => {
    if (cartas.length > 0) {
      setCurrentCarta(cartas[currentIndex]);
    }
  }, [cartas, currentIndex]);

  const handleAnswer = (isCorrect) => {
    if (currentCarta) {
      onAnswerQuestion(currentCarta.id, isCorrect);
      // Pasar a la siguiente carta automáticamente después de 1 segundo
      setTimeout(() => {
        if (currentIndex < cartas.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 1000);
    }
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

  const handleTypeChange = (type) => {
    onCardTypeChange(type);
    setCurrentIndex(0);
  };

  if (!currentCarta) {
    return <div className="quiz-loading">Cargando...</div>;
  }

  const answered = Object.keys(progress.completedQuestions).length;
  const correct = Object.values(progress.scores).filter(s => s === 1).length;
  const accuracy = answered > 0 ? ((correct / answered) * 100).toFixed(1) : 0;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h1 className="quiz-title">Modo Quiz</h1>
        <div className="quiz-stats">
          <span>{answered} respondidas</span>
          <span>{accuracy}% precisión</span>
        </div>
      </div>

      <div className="quiz-content">
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

        <CartaQuiz 
          carta={currentCarta}
          onAnswer={handleAnswer}
          answered={progress.completedQuestions[currentCarta.id] !== undefined}
          isCorrect={progress.completedQuestions[currentCarta.id]}
          attempt={progress.attempts[currentCarta.id] || 0}
        />

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

export default QuizMode;
