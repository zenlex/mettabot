const express = require('express');
const cors = require('cors');
const path = require('path');
const getMsg = require('./messagegen');
const axios = require('axios');
const url = require('url');

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

app.get('/api/twitter/auth', (req, res) => {
  const basicToken = process.env.O2_TWITTER_BASIC_TOKEN;

  res.header('Authorization', `Basic ${basicToken}`);
  res.redirect(
    'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=VHNyVUF3UXhxRjEtSXpZQndmeVE6MTpjaQ&redirect_uri=https://www.mettabot.app/api/twitter/oauthcb&scope=tweet.write&20tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain'
  );
});

app.get('/api/twitter/oauthcb', async (req, res) => {
  console.log('response from twitter auth request: ', {
    body: req.body,
    qparams: req.query,
  });
  const { code } = req.query;
  try {
    const params = new url.URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: process.env.O2_TWITTER_ID,
      redirect_uri: 'https://www.mettabot.app',
      code_verifier: 'challenge',
    });
    const twresponse = await axios.post(
      'https://api.twitter.com/2/oauth2/token',
      params.toString(),
      {
        headers: {
          'Authorization': `Basic ${process.env.O2_TWITTER_BASIC_TOKEN}`,
          'Content-type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log(twresponse.data);
    res.send(twresponse);
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
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
