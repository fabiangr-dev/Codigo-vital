import React from 'react';
import './Statistics.css';

function Statistics({ progress, totalCartas, onReset, onBack, allCartas }) {
  const answered = Object.keys(progress.completedQuestions).length;
  const correct = Object.values(progress.scores).filter(s => s === 1).length;
  const incorrect = answered - correct;
  const accuracy = answered > 0 ? ((correct / answered) * 100).toFixed(1) : 0;
  const completion = ((answered / totalCartas) * 100).toFixed(1);

  // Separar estadísticas por tipo de carta
  const cartasAzules = allCartas.filter(c => c.tipo === 'azul');
  const cartasRojas = allCartas.filter(c => c.tipo === 'roja');

  const azulesRespondidas = cartasAzules.filter(c => progress.completedQuestions[c.id] !== undefined).length;
  const azulesCorrectas = cartasAzules.filter(c => progress.scores[c.id] === 1).length;

  const rojasRespondidas = cartasRojas.filter(c => progress.completedQuestions[c.id] !== undefined).length;
  const rojasCorrectas = cartasRojas.filter(c => progress.scores[c.id] === 1).length;

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <button className="back-btn" onClick={onBack}>← Volver</button>
        <h1>Estadísticas de Desempeño</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="stats-content">
        <div className="stats-grid">
          {/* Overall Stats */}
          <div className="stat-card large">
            <div className="stat-value">{accuracy}%</div>
            <div className="stat-label">Precisión General</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: `${accuracy}%` }}></div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{answered}</div>
            <div className="stat-label">Respondidas</div>
            <div className="stat-subtext">de {totalCartas}</div>
          </div>

          <div className="stat-card">
            <div className="stat-value" style={{ color: '#10b981' }}>{correct}</div>
            <div className="stat-label">Correctas</div>
            <div className="stat-subtext">{completion}% completadas</div>
          </div>

          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ef4444' }}>{incorrect}</div>
            <div className="stat-label">Incorrectas</div>
            <div className="stat-subtext">Oportunidades de aprendizaje</div>
          </div>
        </div>

        {/* Stats by Card Type */}
        <div className="type-stats">
          <div className="type-stat-card blue">
            <h3>Cartas Azules (Riesgo Leve)</h3>
            <div className="type-stat-content">
              <div className="type-stat-item">
                <span>Respondidas:</span>
                <strong>{azulesRespondidas} / {cartasAzules.length}</strong>
              </div>
              <div className="type-stat-item">
                <span>Correctas:</span>
                <strong style={{ color: '#10b981' }}>{azulesCorrectas}</strong>
              </div>
              <div className="type-stat-item">
                <span>Precisión:</span>
                <strong>
                  {azulesRespondidas > 0 
                    ? ((azulesCorrectas / azulesRespondidas) * 100).toFixed(1)
                    : 0}%
                </strong>
              </div>
            </div>
          </div>

          <div className="type-stat-card red">
            <h3>Cartas Rojas (Riesgo Crítico)</h3>
            <div className="type-stat-content">
              <div className="type-stat-item">
                <span>Respondidas:</span>
                <strong>{rojasRespondidas} / {cartasRojas.length}</strong>
              </div>
              <div className="type-stat-item">
                <span>Correctas:</span>
                <strong style={{ color: '#10b981' }}>{rojasCorrectas}</strong>
              </div>
              <div className="type-stat-item">
                <span>Precisión:</span>
                <strong>
                  {rojasRespondidas > 0 
                    ? ((rojasCorrectas / rojasRespondidas) * 100).toFixed(1)
                    : 0}%
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Most Attempted Cards */}
        {Object.keys(progress.attempts).length > 0 && (
          <div className="attempts-section">
            <h3>Cartas con Más Intentos</h3>
            <div className="attempts-list">
              {Object.entries(progress.attempts)
                .filter(([_, attempts]) => attempts > 1)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([cartaId, attempts]) => {
                  const carta = allCartas.find(c => c.id === parseInt(cartaId));
                  return (
                    <div key={cartaId} className="attempt-item">
                      <div className="attempt-info">
                        <span className="attempt-carta">{carta?.tipo === 'azul' ? '🔵' : '🔴'} Carta {carta?.numero}</span>
                        <span className="attempt-text">{carta?.pregunta.substring(0, 50)}...</span>
                      </div>
                      <div className="attempt-count">{attempts} intentos</div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="stats-actions">
          <button className="action-btn primary" onClick={onBack}>
            Continuar Practicando
          </button>
          <button className="action-btn secondary" onClick={onReset}>
            Reiniciar Progreso
          </button>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
