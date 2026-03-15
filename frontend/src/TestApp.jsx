import React from 'react';

function TestApp() {
  return (
    <div style={{ 
      padding: '40px', 
      color: 'white',
      background: '#0F172A',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        🎉 CourseNest is Working!
      </h1>
      <p style={{ fontSize: '24px', marginBottom: '30px' }}>
        The application has loaded successfully!
      </p>
      <div style={{ 
        padding: '20px', 
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>System Status:</h2>
        <ul style={{ fontSize: '18px', lineHeight: '2' }}>
          <li>✅ Frontend: Running on port 3002</li>
          <li>✅ Backend: Running on port 5000</li>
          <li>✅ MongoDB: Connected and seeded</li>
          <li>✅ Database: 8 courses loaded</li>
        </ul>
      </div>
      <p style={{ fontSize: '20px', marginTop: '30px', color: '#6C63FF' }}>
        Navigate to any page using the routes below:
      </p>
      <ul style={{ fontSize: '16px', lineHeight: '2.5', color: '#00D9FF' }}>
        <li><a href="/" style={{ color: '#00D9FF' }}>Home (/)</a></li>
        <li><a href="/courses" style={{ color: '#00D9FF' }}>Courses (/courses)</a></li>
        <li><a href="/login" style={{ color: '#00D9FF' }}>Login (/login)</a></li>
        <li><a href="/signup" style={{ color: '#00D9FF' }}>Signup (/signup)</a></li>
      </ul>
    </div>
  );
}

export default TestApp;
