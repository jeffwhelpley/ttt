import express from 'express';
import path from 'path';

const app = express();
const port = 3003;

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`React fragment running at http://localhost:${port}`);
});
