const express = require('express');
const cors = require('cors');
const path = require('path');
const getMsg = require('./messagegen');

//MIDDLEWARE
const app = express();
app.use(cors());

// request logger
app.use((req, res, next) => {
  console.log(`request ${req.method} ${req.url}`);
  next();
});

//routes
app.get('/ping', (req, res) => {
  res.send('Hello World');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api', (req, res) => {
  const text = getMsg();
  res.json({ text });
});

app.get('/:file', (req, res) => {
  const { file } = req.params;
  res.sendFile(path.join(__dirname, '/public', file));
});

app.use((req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Mettabot server listening on port: ', PORT);
});
