const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

async function postData(content) {
  try {
    const response = await axios.post('https://api.mocky.io/api/mock', {
      status: 200,
      content,
      content_type: 'application/json',
      charset: 'UTF-8',
      secret: 'a1IY1QiCykBxFreJuOWLgQFe9UH8bii6Nrw5',
      expiration: "1year"
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Define a POST endpoint
app.post('/api/mocky', async (req, res) => {
  try {
    const content = req.body.content;
    const result = await postData(content);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
