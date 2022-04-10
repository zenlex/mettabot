require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const getMsg = require('./messagegen');
const twitterRouter = require('./routes/twitter');

//MIDDLEWARE
const app = express();
app.use(cors());

// request logger
app.use((req, res, next) => {
  console.log(`request ${req.method} ${req.url}`);
  next();
});

//routes
app.use('/api/twitter', twitterRouter);

app.get('/ping', (req, res) => {
  res.send('Hello World');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/message', (req, res) => {
  res.json({ text: getMsg() });
});

app.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', req.params.file));
});

app.use((req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Mettabot server listening on port: ', PORT);
});
