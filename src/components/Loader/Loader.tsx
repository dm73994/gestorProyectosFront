import React from 'react'

export const Loader = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#171a4a' }} >
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
