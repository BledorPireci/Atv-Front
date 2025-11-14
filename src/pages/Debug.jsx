import React, { useState, useEffect } from 'react';
import { API_BASE_URL, BACKEND_URL } from '../config/api';

// Debug page to verify API configuration
function Debug() {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [atvStatus, setAtvStatus] = useState('checking...');

  useEffect(() => {
    checkBackend();
    checkAtvEndpoint();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (response.ok) {
        setBackendStatus('✅ Backend is reachable');
      } else {
        setBackendStatus(`❌ Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      setBackendStatus(`❌ Cannot reach backend: ${error.message}`);
    }
  };

  const checkAtvEndpoint = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/atvs`);
      if (response.ok) {
        const data = await response.json();
        setAtvStatus(`✅ ATV endpoint works - ${data.data?.length || 0} ATVs found`);
      } else {
        setAtvStatus(`❌ ATV endpoint failed: ${response.status}`);
      }
    } catch (error) {
      setAtvStatus(`❌ Cannot reach ATV endpoint: ${error.message}`);
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'monospace',
      backgroundColor: '#1a1a1a',
      color: '#00ff00',
      minHeight: '100vh'
    }}>
      <h1>🔍 API Configuration Debug</h1>
      
      <div style={{ marginTop: '30px', lineHeight: '2' }}>
        <h2>Configuration:</h2>
        <p><strong>BACKEND_URL:</strong> {BACKEND_URL}</p>
        <p><strong>API_BASE_URL:</strong> {API_BASE_URL}</p>
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
        <p><strong>VITE_API_BASE_URL:</strong> {import.meta.env.VITE_API_BASE_URL || '❌ NOT SET (using default)'}</p>
      </div>

      <div style={{ marginTop: '30px', lineHeight: '2' }}>
        <h2>Connection Tests:</h2>
        <p><strong>Backend Health:</strong> {backendStatus}</p>
        <p><strong>ATV Endpoint:</strong> {atvStatus}</p>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#2a2a2a',
        borderRadius: '8px'
      }}>
        <h2>Expected Configuration:</h2>
        <p>If you see "NOT SET" above, you need to:</p>
        <ol style={{ lineHeight: '2' }}>
          <li>Go to Vercel Dashboard → Your Project</li>
          <li>Settings → Environment Variables</li>
          <li>Add: <code>VITE_API_BASE_URL</code></li>
          <li>Value: Your Render backend URL (e.g., https://your-backend.onrender.com)</li>
          <li>Redeploy your application</li>
        </ol>
      </div>
    </div>
  );
}

export default Debug;

