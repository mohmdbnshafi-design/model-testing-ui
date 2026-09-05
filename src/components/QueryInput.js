import React from 'react';
import './QueryInput.css';

function QueryInput({ query, onQueryChange, onSubmit, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      onSubmit();
    }
  };

  return (
    <div className="query-input">
      <h2>Ask Anything</h2>
      <p className="query-subtitle">No restrictions, no filters - ask any question or start any discussion</p>
      <textarea
        className="query-textarea"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your query here... (Shift+Enter for new line, Enter to submit)"
        rows="8"
      />
      <div className="query-info">
        <span className="char-count">{query.length} characters</span>
      </div>
      <button
        className="submit-btn"
        onClick={onSubmit}
        disabled={!query.trim() || loading}
      >
        {loading ? '⏳ Processing...' : '📤 Submit Query'}
      </button>
    </div>
  );
}

export default QueryInput;
