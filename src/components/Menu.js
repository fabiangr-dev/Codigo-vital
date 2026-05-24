import React from 'react';
import './Menu.css';

function Menu({ onStartQuiz, onViewCards, onViewStats, progress }) {
  const totalAnswered = Object.keys(progress.completedQuestions).length;
  const correctAnswers = Object.values(progress.scores).filter(s => s === 1).length;

  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="menu-header">
          <h1 className="menu-title">CÓDIGO VITAL</h1>
          <p className="menu-subtitle">Banco de Cartas Clínicas</p>
        </div>

        <div className="menu-cards">
          <div 
            className="menu-card blue-accent"
            onClick={onStartQuiz}
          >
            <div className="card-icon">📝</div>
            <h2>Modo Draw</h2>
            <p>Saca cartas aleatorias y responde preguntas</p>
            {totalAnswered > 0 && (
              <div className="progress-info">
                {correctAnswers} / {totalAnswered} correctas
              </div>
            )}
          </div>

          <div 
            className="menu-card red-accent"
            onClick={onViewCards}
          >
            <div className="card-icon">👀</div>
            <h2>Ver Cartas</h2>
            <p>Explora todas las cartas y sus contenidos</p>
          </div>

          <div 
            className="menu-card purple-accent"
            onClick={onViewStats}
          >
            <div className="card-icon">📊</div>
            <h2>Estadísticas</h2>
            <p>Revisa tu desempeño y progreso general</p>
            {totalAnswered > 0 && (
              <div className="progress-info">
                {((correctAnswers / totalAnswered) * 100).toFixed(1)}% precisión
              </div>
            )}
          </div>
        </div>

        <div className="menu-footer">
          <p>Aprende sobre seguridad clínica de forma interactiva</p>
        </div>
      </div>
    </div>
  );
}

export default Menu;
