import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Chat } from './components/Chat';
import { Analytics } from './pages/Analytics';
import { Setup } from './pages/Setup';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={
            <main className="container mx-auto">
              <Chat />
            </main>
          } />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App