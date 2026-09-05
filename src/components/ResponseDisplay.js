import React from 'react';
import './ResponseDisplay.css';

function ResponseDisplay({ model, query, response, timestamp }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="response-card">
      <div className="response-header">
        <div className="response-model">
          <span className="model-badge">🤖 {model}</span>
          <span className="response-time">{formatTime(timestamp)}</span>
        </div>
      </div>
      <div className="response-query">
        <strong>Query:</strong>
        <p>{query}</p>
      </div>
      <div className="response-body">
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
      <div className="response-footer">
        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(response)}>
          📋 Copy Response
        </button>
      </div>
    </div>
  );
}

export default ResponseDisplay;
