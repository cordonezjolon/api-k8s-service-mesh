const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
  res.json({ message: 'pong deploy againg restart' });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
