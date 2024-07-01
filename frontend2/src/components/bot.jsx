import React, { useState } from 'react';
import axios from 'axios';
import "../style/bot.css"

const Bot = () => {
  const [task, setTask] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/codebot', { task, language });
      setGeneratedCode(response.data.generated_code);
      setReview(response.data.review);
      setError('');
    } catch (error) {
      console.error('Error fetching the code and review:', error);
      setError('Failed to fetch code and review');
    }
    setLoading(false);
  };

   return (
    <div className="bot-container">
 
      <form className="bot-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Task:
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Language:
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="bot-loading" /> : 'Generate Code'}
        </button>
      </form>
      {error && <p className="bot-error">{error}</p>}
      {generatedCode && (
        <div className="bot-output">
          <h2>Generated Code</h2>
          <pre>{generatedCode}</pre>
        </div>
      )}
      {review && (
        <div className="bot-output">
          <h2>Review</h2>
          <pre>{review}</pre>
        </div>
      )}
    </div>
  );
};

export default Bot;
