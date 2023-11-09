import React from 'react'

export const Loader = () => {
  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      background: 'rgba(23,26,74, 1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <img src='src\assets\logoPNG.png' style={{ filter: 'invert(100%)', width: '128px', height: '128px', marginBottom: 20 }} />
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  )
}
