import React, { useState, useEffect } from 'react';
import cartasData from './cartas.json';
import Menu from './components/Menu';
import DrawMode from './components/DrawMode';
import ViewMode from './components/ViewMode';
import Statistics from './components/Statistics';
import './App.css';

function App() {
  const [currentMode, setCurrentMode] = useState('menu'); // menu, quiz, view, stats
  const [allCartas, setAllCartas] = useState([]);
  const [filteredCartas, setFilteredCartas] = useState([]);
  const [progress, setProgress] = useState({
    completedQuestions: {},
    scores: {},
    attempts: {},
    startDate: new Date().toISOString()
  });
  const [cardType, setCardType] = useState('all'); // all, azul, roja

  // Cargar datos de cartas
  useEffect(() => {
    const cartas = [
      ...cartasData.cartasAzules,
      ...cartasData.cartasRojas
    ];
    setAllCartas(cartas);
    setFilteredCartas(cartas);
  }, []);

  // Cargar progreso guardado
  useEffect(() => {
    if (window.api) {
      window.api.loadProgress().then(savedProgress => {
        if (savedProgress) {
          setProgress(savedProgress);
        }
      });
    }
  }, []);

  // Guardar progreso
  useEffect(() => {
    if (window.api && Object.keys(progress.completedQuestions).length > 0) {
      window.api.saveProgress(progress);
    }
  }, [progress]);

  // Filtrar cartas según el tipo seleccionado
  useEffect(() => {
    if (cardType === 'all') {
      setFilteredCartas(allCartas);
    } else {
      setFilteredCartas(allCartas.filter(carta => carta.tipo === cardType));
    }
  }, [cardType, allCartas]);

  const handleAnswerQuestion = (cartaId, isCorrect) => {
    setProgress(prev => ({
      ...prev,
      completedQuestions: {
        ...prev.completedQuestions,
        [cartaId]: isCorrect
      },
      scores: {
        ...prev.scores,
        [cartaId]: isCorrect ? 1 : 0
      },
      attempts: {
        ...prev.attempts,
        [cartaId]: (prev.attempts[cartaId] || 0) + 1
      }
    }));
  };

  const handleReset = () => {
    setProgress({
      completedQuestions: {},
      scores: {},
      attempts: {},
      startDate: new Date().toISOString()
    });
    setCurrentMode('menu');
  };

  return (
    <div className="app">
      {currentMode === 'menu' && (
        <Menu
          onStartQuiz={() => {
            setCurrentMode('quiz');
            setCardType('all');
          }}
          onViewCards={() => {
            setCurrentMode('view');
            setCardType('all');
          }}
          onViewStats={() => setCurrentMode('stats')}
          progress={progress}
        />
      )}

      {currentMode === 'quiz' && (
        <DrawMode
          cartas={filteredCartas}
          cardType={cardType}
          onCardTypeChange={setCardType}
          onAnswerQuestion={handleAnswerQuestion}
          onBack={() => setCurrentMode('menu')}
          progress={progress}
        />
      )}

      {currentMode === 'view' && (
        <ViewMode
          cartas={filteredCartas}
          cardType={cardType}
          onCardTypeChange={setCardType}
          onBack={() => setCurrentMode('menu')}
          progress={progress}
        />
      )}

      {currentMode === 'stats' && (
        <Statistics
          progress={progress}
          totalCartas={allCartas.length}
          onReset={handleReset}
          onBack={() => setCurrentMode('menu')}
          allCartas={allCartas}
        />
      )}
    </div>
  );
}

export default App;
