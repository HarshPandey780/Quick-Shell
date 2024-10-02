// src/App.jsx
import React from 'react';
import KanbanBoard from './components/KanbanBoard.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;