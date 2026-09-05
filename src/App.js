import React, { useState } from 'react';
import './App.css';
import ModelSelector from './components/ModelSelector';
import QueryInput from './components/QueryInput';
import ResponseDisplay from './components/ResponseDisplay';
import ComparisonView from './components/ComparisonView';

function App() {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'comparison'
  const [comparisonModels, setComparisonModels] = useState(['gpt-4', 'claude-3']);

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Advanced language model' },
    { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient' },
    { id: 'claude-3', name: 'Claude 3', description: 'Anthropic advanced model' },
    { id: 'claude-2', name: 'Claude 2', description: 'Anthropic model' },
    { id: 'palm', name: 'PaLM', description: 'Google language model' },
    { id: 'llama', name: 'Llama 2', description: 'Meta open-source model' }
  ];

  const handleSubmitQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await simulateModelResponse(selectedModel, query);
      setResponses([...responses, { model: selectedModel, query, response, timestamp: new Date() }]);
      setQuery('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateModelResponse = (model, query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = {
          'gpt-4': `Response from GPT-4 about: "${query}"\n\nThis is a comprehensive response with detailed analysis and nuanced understanding of the topic.`,
          'gpt-3.5': `Quick response from GPT-3.5 about: "${query}"\n\nThis model provides fast responses with good quality.`,
          'claude-3': `Claude 3 analysis of: "${query}"\n\nDetailed and thoughtful response with clear reasoning.`,
          'claude-2': `Claude 2 response to: "${query}"\n\nSolid response with good context understanding.`,
          'palm': `PaLM model response about: "${query}"\n\nGoogle's advanced language model perspective.`,
          'llama': `Llama 2 response to: "${query}"\n\nOpen-source model perspective on your query.`
        };
        resolve(responses[model] || 'Model response not available');
      }, 1000);
    });
  };

  const handleClearHistory = () => {
    setResponses([]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤖 Model Testing UI</h1>
        <p>Test and compare different AI models with unrestricted queries</p>
      </header>

      <div className="app-controls">
        <button 
          className={`view-toggle ${viewMode === 'single' ? 'active' : ''}`}
          onClick={() => setViewMode('single')}
        >
          Single Model
        </button>
        <button 
          className={`view-toggle ${viewMode === 'comparison' ? 'active' : ''}`}
          onClick={() => setViewMode('comparison')}
        >
          Compare Models
        </button>
      </div>

      <main className="app-main">
        {viewMode === 'single' ? (
          <div className="single-model-view">
            <ModelSelector 
              models={models}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            <QueryInput 
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSubmitQuery}
              loading={loading}
            />
          </div>
        ) : (
          <ComparisonView 
            models={models}
            selectedModels={comparisonModels}
            onModelsChange={setComparisonModels}
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSubmitQuery}
            loading={loading}
          />
        )}

        <div className="responses-section">
          <div className="responses-header">
            <h2>Responses</h2>
            {responses.length > 0 && (
              <button className="clear-btn" onClick={handleClearHistory}>Clear History</button>
            )}
          </div>
          <div className="responses-container">
            {responses.length === 0 ? (
              <div className="empty-state">
                <p>No responses yet. Submit a query to get started!</p>
              </div>
            ) : (
              responses.map((resp, idx) => (
                <ResponseDisplay 
                  key={idx}
                  model={resp.model}
                  query={resp.query}
                  response={resp.response}
                  timestamp={resp.timestamp}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
