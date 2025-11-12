import express from 'express';
import path from 'path';

const app = express();
const port = 3002;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
    console.log(`Vanilla JS fragment running at http://localhost:${port}`);
});
