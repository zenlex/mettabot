const express = require('express');
const cors = require('cors');
const path = require('path');
const getMsg = require('./messagegen');
const axios = require('axios');
const url = require('url');
const { TwitterApi } = require('twitter-api-v2');
let twitState;
let twitCodeVerifier;

//MIDDLEWARE
const app = express();
app.use(cors());

//INIT Twitter Client
const client = new TwitterApi({
  clientId: process.env.TWITTER_API_KEY,
  clientSecret: process.env.TWITTER_API_KEY_SECRET,
});

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

// authenticator url
app.get('/api/twitter/auth', async (req, res) => {
  const authLink = await client.generateOAuth2AuthLink(
    'https://www.mettabot.app/api/twitter/oauthcb',
    { scope: ['tweet.read', 'user.read', 'tweet.write'] }
  );
  const { url, codeVerifier, state } = authLink;
  twitCodeVerifier = codeVerifier;
  twitState = state;
  res.redirect(url);
});

// twitter callback url for code request
app.get('/api/twitter/oauthcb', async (req, res) => {
  console.log('response from twitter auth request: ', {
    body: req.body,
    qparams: req.query,
  });
  try {
    const { state, code } = req.query;
    const codeVerifier = twitCodeVerifier;
    const sessionState = twitState;

    if (!codeVerifier || !state || !sessionState || !code) {
      return res.status(400).send('App denied or session expired');
    }
    if (state !== sessionState) {
      return res.status(400).send('Stored tokens did not match');
    }

    const client = new TwitterApi({
      clientId: process.env.O2_TWITTER_ID,
      clientSecret: process.env.O2_TWITTER_SECRET,
    });

    client
      .loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: 'https://www.mettabot.app',
      })
      .then(
        async ({
          client: loggedClient,
          accessToken,
          refreshToken,
          expiresIn,
        }) => {
          const { data } = await loggedClient.v2.tweet(getMsg());
        }
      )
      .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
    /* PREVIOUS ATTEMPT WITHOUT LIBRARY ------------------->
    //create url encoded params for token req
    const params = new url.URLSearchParams({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.O2_TWITTER_ID,
      code_verifier: 'challenge',
      redirect_uri: 'https://www.mettabot.app',
    });
    //request OAuth2 Token
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
    */
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
