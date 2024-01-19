// authSettings.js
// Made by Yoann Raton, 18/01/2024

const OAuth = require('oauth');
const axios = require('axios');

// Trello API key and secret
const apiKey = 'fa9aab0039cce75efc142efc7e65a403';
const apiSecret = 'a54e7f3488ca0a442879d97a77b27993e7d6d3682ec10849cd099e8b8bbd9f16';
const appName = 'Linguini';
const authorizeCallback = 'https://linguini-trello.vercel.app/';

function setPowerUp(apiKey, apiSecret, appName, authorizeCallback) {
    // Set up OAuth
    const oauth = new OAuth.OAuth(
      'https://trello.com/1/OAuthGetRequestToken',
      'https://trello.com/1/OAuthGetAccessToken',
      apiKey,
      apiSecret,
      '1.0A',
      null,
      'HMAC-SHA1'
    );
  
    // Generate authorization URL
    oauth.getOAuthRequestToken(function(error, token, tokenSecret) {
      if (error) {
        console.error('Error getting request token:', error);
      } else {
        const authorizeUrl = `https://trello.com/1/OAuthAuthorizeToken?oauth_token=${token}&name=${appName}&expiration=never&scope=read,write&callback_method=fragment&return_url=${authorizeCallback}`;
  
        console.log(`Authorize your app by visiting: ${authorizeUrl}`);
  
        // After authorization, Trello will redirect to your callback URL with the oauth_token and oauth_verifier in the URL fragment
        // Extract these values and use them to get the access token
        const oauth_verifier = 'REPLACE_WITH_VERIFIER_FROM_CALLBACK_URL'; // Extract from the callback URL
  
        oauth.getOAuthAccessToken(token, tokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret) {
          if (error) {
            console.error('Error getting access token:', error);
          } else {
            console.log('Access Token:', accessToken);
            console.log('Access Token Secret:', accessTokenSecret);
          }
        });
      }
    });
  }
  
