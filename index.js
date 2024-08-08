const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Function to post data
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
    return response;
  } catch (error) {
    throw error;
  }
}

// Endpoint to upload code
app.post('/api/mocky', async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required.' });
  }

  const filePath = path.join(__dirname, `${fileName}.js`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `File not found: ${fileName}.js` });
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const response = await postData(fileContent);
    res.json({ link: response.data.link });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
