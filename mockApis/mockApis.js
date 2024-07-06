const express = require('express');
const app = express();
const port = process.argv[2] || 3001;

app.get('/fast', (req, res) => {
    setTimeout(() => res.send('Fast response'), 100);
});

app.get('/slow', (req, res) => {
    setTimeout(() => res.send('Slow response'), 2000);
});

app.listen(port, () => {
    console.log(`Mock API running on port ${port}`);
});