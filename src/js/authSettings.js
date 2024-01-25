// authSettings.js
// Made by Yoann Raton, 18/01/2024

const OAuth = require('oauth');
const axios = require('axios');

class oAuth {

  constructor() {
    // Trello API key and secret
    this._apiKey = 'fa9aab0039cce75efc142efc7e65a403';
    this._apiSecret = 'a54e7f3488ca0a442879d97a77b27993e7d6d3682ec10849cd099e8b8bbd9f16';
    this._appName = 'Linguini';
    this._authorizeCallback = 'https://linguini-trello.vercel.app/';
    this._appAccessToken = "ATTA21dc26ef75ab9c9515db8d414d25dd4e68165a6760e8bd533a86c0a96070ab09DADAEE60"
  }

  // Getters
  get apiKey() {
    return this._apiKey;
  }

  get apiSecret() {
    return this._apiSecret;
  }

  get appName() {
    return this._appName;
  }

  get authorizeCallback() {
    return this._authorizeCallback;
  }

  get appAccessToken() {
    return this._appAccessToken;
  }

  // Setters
  set apiKey(value) {
    this._apiKey = value;
  }

  set apiSecret(value) {
    this._apiSecret = value;
  }

  set appName(value) {
    this._appName = value;
  }

  set authorizeCallback(value) {
    this._authorizeCallback = value;
  }

  set appAccessToken(value) {
    this._appAccessToken = value;
  }
}

export default oAuth;
