import React from 'react';
import './App.css';
import Home from './componets/Home';
import NavBar from './componets/NavBar';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider >
        <NavBar />
        <Home />
      </AuthProvider>
    </div>
  );
}

export default App;
