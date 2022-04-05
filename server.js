const express = require('express');
const cors = require('cors');
const path = require('path');
const getMsg = require('./messagegen');
const axios = require('axios');

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

app.get('/api/twitter', (req, res) => {
  const basicToken = process.env.O2_TWITTER_BASIC_TOKEN;
  axios.get(
    'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=VHNyVUF3UXhxRjEtSXpZQndmeVE6MTpjaQ&redirect_uri=https://www.mettabot.app/api/twitter/auth&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain',
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
    }
  );
});

app.get('/api/twitter/auth', (req, res) => {
  console.log('response from twitter auth request: ', {
    body: req.body,
    params: req.params,
  });
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
