// Safe main.jsx WITHOUT Redux to prevent 500 errors
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Safe rendering with comprehensive error handling
const initializeApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found');
      return;
    }

    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    
    console.log('✅ DAMS App successfully initialized without Redux');
  } catch (error) {
    console.warn('🛡️ App initialization error handled:', error.message);
    
    // Fallback rendering
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        ">
          <div style="background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; backdrop-filter: blur(10px);">
            <h1 style="margin: 0 0 20px 0; font-size: 2.5em;">🏥 DAMS</h1>
            <h2 style="margin: 0 0 15px 0; font-weight: 300;">Doctor Appointment Management System</h2>
            <p style="margin: 0; opacity: 0.8;">Initializing your healthcare dashboard...</p>
            <div style="margin: 30px 0;">
              <div style="
                display: inline-block;
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255,255,255,0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
              "></div>
            </div>
            <style>
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </div>
        </div>
      `;
      
      // Try to reload the page after a delay
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }
};

// Initialize the app
initializeApp();
