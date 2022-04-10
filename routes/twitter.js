const router = require('express').Router();
const { TwitterApi } = require('twitter-api-v2');
const getMsg = require('../messagegen');

//INIT Twitter Client
const client = new TwitterApi({
  clientId: process.env.O2_TWITTER_ID,
  clientSecret: process.env.O2_TWITTER_SECRET,
});

let twitState;
let twitCodeVerifier;

const callbackUrl =
  process.env.NODE_ENV === 'dev'
    ? `http://127.0.0.1:3000/api/twitter/oauthcb`
    : 'https://www.mettabot.app/api/twitter/oauthcb';

// authenticator url
router.get('/asme', async (req, res) => {
  const authLink = await client.generateOAuth2AuthLink(callbackUrl, {
    scope: ['tweet.read', 'users.read', 'tweet.write', 'offline.access'],
  });
  const { url: authUrl, codeVerifier, state } = authLink;
  console.log('authlink: ', authLink);
  twitCodeVerifier = codeVerifier;
  twitState = state;
  res.redirect(authUrl);
});

// twitter callback url for code request
router.get('/oauthcb', async (req, res) => {
  console.log('response from twitter auth request: ', {
    qparams: req.query,
  });
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
      redirectUri: callbackUrl,
    })
    .then(
      async ({
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn,
      }) => {
        const newMsg = getMsg();
        console.log('message to be tweeted: ', newMsg);
        const { data } = await loggedClient.v2.tweet(newMsg);
        console.log('data return from tweet attempt: ', data);
        res.redirect(`https://www.twitter.com/anyuser/status/${data.id}`);
      }
    )
    .catch((err) => {
      res.send(err);
      // res.status(403).send('Invalid verifier or access tokens!'));
    });
});

module.exports = router;
