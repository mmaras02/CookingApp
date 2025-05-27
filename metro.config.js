// Learn more https://docs.expo.io/guides/customizing-metro
/*const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
//const config = getDefaultConfig(__dirname);

//module.exports = config;

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.unstable_allowRequireContext = true; // Required for Expo Router

module.exports = config;
