// authSettings.js
// Made by Yoann Raton, 18/01/2024

const OAuth = require('oauth');
const axios = require('axios');

class oAuth {

  constructor() {
    // Trello API key and secret
    this.apiKey = 'fa9aab0039cce75efc142efc7e65a403';
    this.apiSecret = 'a54e7f3488ca0a442879d97a77b27993e7d6d3682ec10849cd099e8b8bbd9f16';
    this.appName = 'Linguini';
    this.authorizeCallback = 'https://linguini-trello.vercel.app/';
    this.appAccessToken = "ATTA21dc26ef75ab9c9515db8d414d25dd4e68165a6760e8bd533a86c0a96070ab09DADAEE60"
  }

    // Getters
    get apiKey() {
      return this.apiKey;
    }
  
    get apiSecret() {
      return this.apiSecret;
    }
  
    get appName() {
      return this.appName;
    }
  
    get authorizeCallback() {
      return this.authorizeCallback;
    }
  
    get appAccessToken() {
      return this.appAccessToken;
    }
}

export default oAuth;
