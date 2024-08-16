import { HfInference } from '@huggingface/inference'
import React, { useState } from 'react';
import axios from 'axios';

const hf = new HfInference('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')

const HuggingFaceComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    try {
      const result = await axios.post(
        'https://api-inference.huggingface.co/models/distilgpt2',
        { inputs: prompt },
        {
          headers: { 'Authorization': `Bearer ${hf}` }
        }
      );
      setResponse(result.data[0].generated_text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Enter your prompt here"
      />
      <button onClick={handleGenerate}>Generate</button>
      <pre>{response}</pre>
    </div>
  );
};

export default HuggingFaceComponent;
