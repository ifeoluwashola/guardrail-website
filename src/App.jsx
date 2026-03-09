import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Features from './components/Features';
import Documentation from './components/Documentation';
import HowItWorks from './components/HowItWorks';
import Releases from './components/Releases';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <h1 style={{ cursor: 'pointer' }} onClick={() => setActiveTab('home')}>🛡️ <span className="gradient-text">Guardrail CLI</span></h1>
        </div>
        <nav>
          <a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home</a>
          <a href="#" className={activeTab === 'docs' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('docs'); }}>Documentation</a>
          <a href="#" className={activeTab === 'releases' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('releases'); }}>Releases</a>
          <a href="https://github.com/ifeoluwashola/guardrail" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <main>
        {activeTab === 'home' && (
          <>
            <Hero onGetStarted={() => setActiveTab('docs')} />
            <Features />
            <HowItWorks />
          </>
        )}
        {activeTab === 'docs' && <Documentation />}
        {activeTab === 'releases' && <Releases />}
      </main>

      <footer>
        <p>Guardrail CLI is Open Source (MIT License). Built to protect production environments.</p>
      </footer>
    </div>
  );
}

export default App;
