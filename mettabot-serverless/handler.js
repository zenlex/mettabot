'use strict';
require('dotenv').config();
const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

module.exports.hello = async (event) => {
  const tweetResponse = await new Promise((resolve, reject) => {
    T.post(
      'statuses/update',
      { status: "hello world! I love you all - Mettabot's first tweet.." },
      function (err, data, response) {
        console.log(data);
      }
    );
  });

  return tweetResponse;
};
