import express from 'express';
import path from 'path';

const app = express();
const port = 3002;
const fragmentPath = '/__wf/vanilla-fragment';

// Serve static files from the public directory at the fragment path
app.use(fragmentPath, express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
    console.log(`Vanilla JS fragment running at http://localhost:${port}`);
});
