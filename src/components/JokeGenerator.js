import React, { useState, useEffect } from 'react';
import './JokeGenerator.css';

function JokeGenerator() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [jokeType, setJokeType] = useState('any');
  const [jokeHistory, setJokeHistory] = useState([]);

  // Joke API endpoints
  const jokeAPIs = {
    any: 'https://v2.jokeapi.dev/joke/Any?type=single',
    programming: 'https://v2.jokeapi.dev/joke/Programming?type=single',
    knock: 'https://v2.jokeapi.dev/joke/Knock-Knock?type=single',
    random: 'https://official-joke-api.appspot.com/random_joke'
  };

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    setJoke('');

    try {
      let jokeData = {};
      
      if (jokeType === 'random') {
        const response = await fetch(jokeAPIs.random);
        if (!response.ok) throw new Error('Failed to fetch joke');
        jokeData = await response.json();
        const formattedJoke = `${jokeData.setup}\n\n${jokeData.punchline}`;
        setJoke(formattedJoke);
        addToHistory(formattedJoke);
      } else {
        const response = await fetch(jokeAPIs[jokeType]);
        if (!response.ok) throw new Error('Failed to fetch joke');
        jokeData = await response.json();
        
        if (jokeData.joke) {
          setJoke(jokeData.joke);
          addToHistory(jokeData.joke);
        } else if (jokeData.setup && jokeData.delivery) {
          const formattedJoke = `${jokeData.setup}\n\n${jokeData.delivery}`;
          setJoke(formattedJoke);
          addToHistory(formattedJoke);
        }
      }
    } catch (err) {
      setError('Could not fetch joke. Please try again!');
      console.error('Error fetching joke:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (newJoke) => {
    setJokeHistory([{ text: newJoke, timestamp: new Date() }, ...jokeHistory.slice(0, 9)]);
  };

  const copyToClipboard = () => {
    if (joke) {
      navigator.clipboard.writeText(joke);
      alert('Joke copied to clipboard! 📋');
    }
  };

  const shareJoke = () => {
    if (navigator.share && joke) {
      navigator.share({
        title: 'Check out this joke!',
        text: joke
      }).catch(err => console.log('Error sharing:', err));
    }
  };

  const clearHistory = () => {
    setJokeHistory([]);
  };

  useEffect(() => {
    fetchJoke();
  }, []); // Fetch initial joke on component mount

  return (
    <div className="joke-generator-container">
      <header className="joke-header">
        <h1>😂 Random Joke Generator</h1>
        <p>Get unlimited laughs from our amazing joke APIs!</p>
      </header>

      <main className="joke-main">
        <div className="joke-controls">
          <div className="controls-group">
            <label htmlFor="joke-type">Select Joke Type:</label>
            <select
              id="joke-type"
              value={jokeType}
              onChange={(e) => setJokeType(e.target.value)}
              className="joke-select"
              disabled={loading}
            >
              <option value="any">Any Joke</option>
              <option value="programming">Programming Jokes</option>
              <option value="knock">Knock-Knock Jokes</option>
              <option value="random">Random</option>
            </select>
          </div>

          <button
            className="generate-btn"
            onClick={fetchJoke}
            disabled={loading}
          >
            {loading ? '⏳ Loading Joke...' : '🎲 Get a Joke!'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {joke && (
          <div className="joke-display">
            <div className="joke-content">
              <p>{joke}</p>
            </div>
            <div className="joke-actions">
              <button className="action-btn" onClick={copyToClipboard}>
                📋 Copy
              </button>
              <button className="action-btn" onClick={shareJoke}>
                🔗 Share
              </button>
            </div>
          </div>
        )}

        {!joke && !loading && !error && (
          <div className="empty-state">
            <p>Click "Get a Joke!" to start laughing! 🤣</p>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching the perfect joke for you...</p>
          </div>
        )}

        <div className="joke-history">
          <div className="history-header">
            <h2>📜 Joke History</h2>
            {jokeHistory.length > 0 && (
              <button className="clear-history-btn" onClick={clearHistory}>
                Clear
              </button>
            )}
          </div>
          {jokeHistory.length === 0 ? (
            <p className="history-empty">No jokes yet. Get started!</p>
          ) : (
            <div className="history-list">
              {jokeHistory.map((item, idx) => (
                <div key={idx} className="history-item">
                  <p className="history-text">{item.text.substring(0, 100)}...</p>
                  <span className="history-time">
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="joke-footer">
        <p>Powered by JokeAPI & Official Joke API 🚀</p>
      </footer>
    </div>
  );
}

export default JokeGenerator;
