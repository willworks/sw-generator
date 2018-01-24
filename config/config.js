'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  root: './',
  cacheId: '',
  swFile: 'service-worker.js',
  swRegisterPath: './',
  swFilePath: './service-worker.js',
  runtimeCaching: [],
  clientsClaim: true,
  directoryIndex: 'index.html',
  dontCacheBustUrlsMatching: null,
  dynamicUrlToDependencies: {},
  handleFetch: true,
  ignoreUrlParametersMatching: [ /^utm_/ ],
  importScripts: [],
  logger: console.log,
  maximumFileSizeToCacheInBytes: 2 * 1024 * 1024, // 2MB
  navigateFallback: '',
  navigateFallbackWhitelist: [],
  replacePrefix: '',
  skipWaiting: true,
  staticFileGlobs: [
    'lib/**.js',
  ],
  cdnFiles: [
    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.common.js',
  ], // cdn文件目录
  stripPrefix: '',
  stripPrefixMulti: {},
  templateFilePath: path.join(path.dirname(fs.realpathSync(__filename)), '..', 'service-worker.tmpl'),
  verbose: false,
};
