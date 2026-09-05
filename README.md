# Model Testing UI

A clean, minimally restrictive React-based user interface for testing and comparing different AI models.

## Features

✨ **Key Features:**
- 🤖 Test multiple AI models with the same query
- 🔄 Compare model responses side-by-side
- 📝 No content restrictions - ask any question
- 🎨 Clean, modern, intuitive UI
- ⚡ Real-time response display
- 📋 Copy responses with one click
- 📊 Supports unrestricted discussions

## Supported Models

- GPT-4
- GPT-3.5
- Claude 3
- Claude 2
- PaLM
- Llama 2

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
model-testing-ui/
├── public/
│   ├── index.html
│   ├── index.js
│   └── index.css
├── src/
│   ├── components/
│   │   ├── ModelSelector.js
│   │   ├── QueryInput.js
│   │   ├── ResponseDisplay.js
│   │   └── ComparisonView.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Usage

### Single Model Mode
1. Select a model from the Model Selector panel
2. Enter your query in the text area
3. Click "Submit Query" or press Enter
4. View the response below

### Comparison Mode
1. Click the "Compare Models" button at the top
2. Select multiple models by checking their checkboxes
3. Enter your query
4. Click "Compare Models" to get responses from all selected models
5. View and compare responses

## Configuration

To connect to actual API endpoints, modify the `simulateModelResponse` function in `App.js` to make real API calls to your model backends.

## Customization

### Adding New Models

Edit the `models` array in `App.js`:

```javascript
const models = [
  { id: 'model-id', name: 'Model Name', description: 'Description' },
  // Add more models here
];
```

### Styling

Modify the CSS files in `src/components/` and `src/App.css` to customize the appearance.

## Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## License

MIT License - Feel free to use this project for any purpose.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
