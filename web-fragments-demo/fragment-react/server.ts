import express from 'express';
import path from 'path';

const app = express();
const port = 3003;

// Enable CORS for fragment assets
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`React fragment running at http://localhost:${port}`);
});
