// services/facturapi.js
require('dotenv').config();
const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://www.facturapi.io/v2',
  headers: {
    Authorization: `Bearer ${process.env.FACTURAPI_SECRET_KEY}`
  }
});

module.exports = instance;