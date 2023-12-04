import React from 'react'

export const CustomLoader = () => {
  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'absolute',
    }}>
      <img src='src\assets\logoPNG.png' style={{ width: '64px', height: '64px', marginBottom: 20 }} />
      <div className="loading-dots">
        <div className="dot2"></div>
        <div className="dot2"></div>
        <div className="dot2"></div>
        <div className="dot2"></div>
        <div className="dot2"></div>
      </div>
    </div>
  )
}
