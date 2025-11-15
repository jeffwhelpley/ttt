import express from 'express';
import path from 'path';

const app = express();
const port = 3003;
const fragmentPath = '/__wf/react-fragment';

// Serve static files from the React build at the fragment path
app.use(fragmentPath, express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`React fragment running at http://localhost:${port}`);
});
