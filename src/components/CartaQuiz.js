import React, { useState } from 'react';
import './CartaQuiz.css';

function CartaQuiz({ carta, onAnswer, answered, isCorrect, attempt }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option) => {
    if (!answered && !showFeedback) {
      setSelectedOption(option);
      const isAnswerCorrect = option === carta.respuestaCorrecta;
      setShowFeedback(true);
      setTimeout(() => {
        onAnswer(isAnswerCorrect);
      }, 800);
    }
  };

  const cartaClass = carta.tipo === 'azul' ? 'card-blue' : 'card-red';

  return (
    <div className={`carta-quiz ${cartaClass}`}>
      <div className="carta-header">
        <span className="carta-number">Carta {carta.numero}</span>
        <span className={`categoria ${carta.tipo}`}>
          {carta.categoria}
        </span>
        {attempt > 0 && <span className="attempt-badge">Intento {attempt}</span>}
      </div>

      <div className="carta-body">
        <div className="situacion">
          <h3>Situación:</h3>
          <p>{carta.situacion}</p>
        </div>

        <div className="pregunta">
          <h3>{carta.pregunta}</h3>
        </div>

        <div className="opciones">
          {['A', 'B', 'C'].map(option => (
            <button
              key={option}
              className={`opcion ${
                selectedOption === option ? 'selected' : ''
              } ${
                showFeedback && option === carta.respuestaCorrecta ? 'correct' : ''
              } ${
                showFeedback && selectedOption === option && option !== carta.respuestaCorrecta ? 'incorrect' : ''
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={answered || showFeedback}
            >
              <span className="option-letter">{option}</span>
              <span className="option-text">{carta.opciones[option]}</span>
              {showFeedback && option === carta.respuestaCorrecta && (
                <span className="feedback-icon">✓</span>
              )}
              {showFeedback && selectedOption === option && option !== carta.respuestaCorrecta && (
                <span className="feedback-icon">✗</span>
              )}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${selectedOption === carta.respuestaCorrecta ? 'success' : 'error'}`}>
            <h4>{selectedOption === carta.respuestaCorrecta ? '¡Correcto!' : 'Incorrecto'}</h4>
            <p>
              {selectedOption === carta.respuestaCorrecta
                ? `Consecuencia: ${carta.consecuenciaCorrecta}`
                : `Consecuencia: ${carta.consecuenciaIncorrecta}`}
            </p>
            <div className="feedback-explanation">
              <strong>Respuesta correcta:</strong> {carta.opciones[carta.respuestaCorrecta]} ({carta.respuestaCorrecta})
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartaQuiz;
