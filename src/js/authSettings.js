// authSettings.js
// Made by Yoann Raton, 18/01/2024

const OAuth = require('oauth');
const axios = require('axios');

class oAuth {

  constructor() {
  }

  // Getters
  get apiKey() {
    return 'fa9aab0039cce75efc142efc7e65a403';
  }

  get apiSecret() {
    return 'a54e7f3488ca0a442879d97a77b27993e7d6d3682ec10849cd099e8b8bbd9f16';
  }

  get appName() {
    return 'Linguini';
  }

  get authorizeCallback() {
    return 'https://linguini-trello.vercel.app/';
  }

  get appAccessToken() {
    return "ATTA21dc26ef75ab9c9515db8d414d25dd4e68165a6760e8bd533a86c0a96070ab09DADAEE60";
  }
}

export default oAuth;
