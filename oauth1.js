const OAuth = require('oauth');
const { promisify } = require('util');
require('dotenv').config();

//OAUTH 1.0a attempt
getTwitterUserProfileWithOauth1('erich_keil')
  .then(
    (profile) =>
      console.log('oauth1 response', JSON.stringify(profile, null, 2)) &&
      process.exit(0)
  )
  .catch((err) => console.error(err) && process.exit(1));

async function getTwitterUserProfileWithOauth1(username = 'erich_keil') {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_KEY_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  const get = promisify(oauth.get.bind(oauth));
  const post = promisify(oauth.post.bind(oauth));
  // const body = await get(
  //   `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
  //   process.env.TWITTER_ACCESS_TOKEN,
  //   process.env.TWITTER_ACCESS_TOKEN_SECRET
  // );
  const body = await post(
    `https://api.twitter.com/1.1/statuses/update?status=heLlOwOrlDtEstTwEetT`,
    process.env.TWITTER_ACCESS_TOKEN,
    process.env.TWITTER_ACCESS_TOKEN_SECRET
  );

  return JSON.parse(body);
}
