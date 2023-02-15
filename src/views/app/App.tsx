import React from 'react';
import './App.css';
import { Canvas } from '../canvas/Canvas';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Canvas></Canvas>
    </div>
  );
}

export default App;
