import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  try {
    const response = await axios.get('https://api.sambanova.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.SAMBANOVA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Available models:', response.data);
  } catch (error) {
    console.error('Error fetching models:', error.response?.data || error.message);
  }
}

listModels();