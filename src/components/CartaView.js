import React from 'react';
import './CartaView.css';

function CartaView({ carta, answered, isCorrect, attempt }) {
  const cartaClass = carta.tipo === 'azul' ? 'card-blue' : 'card-red';

  return (
    <div className={`carta-view ${cartaClass}`}>
      <div className="carta-view-header">
        <div>
          <span className="carta-number">Carta {carta.numero}</span>
          <span className={`categoria ${carta.tipo}`}>
            {carta.categoria}
          </span>
        </div>
        <div className="status-badges">
          {answered && (
            <span className={`status-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '✓ Respondida Correctamente' : '✗ Respondida Incorrectamente'}
            </span>
          )}
          {attempt > 0 && <span className="attempt-badge">Intento {attempt}</span>}
        </div>
      </div>

      <div className="carta-view-body">
        <div className="section situacion">
          <h3>📋 Situación</h3>
          <p>{carta.situacion}</p>
        </div>

        <div className="section pregunta">
          <h3>❓ Pregunta</h3>
          <p>{carta.pregunta}</p>
        </div>

        <div className="section opciones">
          <h3>📝 Opciones</h3>
          <div className="opciones-list">
            {['A', 'B', 'C'].map(option => (
              <div 
                key={option}
                className={`opcion-view ${option === carta.respuestaCorrecta ? 'correct-answer' : ''}`}
              >
                <span className="option-letter">{option})</span>
                <span className="option-content">
                  {carta.opciones[option]}
                  {option === carta.respuestaCorrecta && (
                    <span className="correct-mark">✓ Respuesta Correcta</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section respuesta">
          <h3>✓ Respuesta Correcta</h3>
          <div className="answer-box">
            <strong>{carta.respuestaCorrecta})</strong>
            <span>{carta.opciones[carta.respuestaCorrecta]}</span>
          </div>
        </div>

        <div className="consequences">
          <div className="consequence-item correct">
            <h4>✓ Consecuencia Correcta</h4>
            <p>{carta.consecuenciaCorrecta}</p>
          </div>
          <div className="consequence-item incorrect">
            <h4>✗ Consecuencia Incorrecta</h4>
            <p>{carta.consecuenciaIncorrecta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartaView;
