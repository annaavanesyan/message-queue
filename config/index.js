'use strict';

require('dotenv').config();
const config = require('nconf');

config.argv().env();

module.exports = config;
