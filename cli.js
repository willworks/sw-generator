#!/usr/bin/env node
'use strict';

const fs = require('fs');
const pkg = require('./package.json');
const program = require('commander');
const path = require('path');
const defConfig = require('./config/config');
const swGenerator = require('./');

const mergeOptions = (defConfig, cusConfig) => {
  const options = Object.assign({}, defConfig, cusConfig);
  if (options.root.lastIndexOf('/') !== options.root.length - 1) {
    options.root += '/';
  }
  options.stripPrefix = options.stripPrefix || options.root;
  if (options.staticFileGlobs) {
    if (typeof options.staticFileGlobs === 'string') {
      options.staticFileGlobs = [ options.staticFileGlobs ];
    }
  } else {
    options.staticFileGlobs = [ options.root + '/**/*.*' ];
  }
  if (options.ignoreUrlParametersMatching && typeof options.ignoreUrlParametersMatching === 'string') {
    options.ignoreUrlParametersMatching = options.ignoreUrlParametersMatching.split(',').map(s => new RegExp(s));
  }
  if (options.importScripts && typeof options.importScripts === 'string') {
    options.importScripts = options.importScripts.split(',');
  }
  options.skipWaiting = 'skipWaiting' in options ? options.skipWaiting : undefined;
  options.clientsClaim = 'clientsClaim' in options ? options.skipWaiting : undefined;
  return options;
};

program
  .version(pkg.version)
  .usage('serviceWorker generator with runtime & less config')
  .option('-c, --config', 'custom config file path')
  .action(file => {
    const cusConfig = file ? require(path.resolve(file)) : {};
    const options = mergeOptions(defConfig, cusConfig);
    // write ServiceWorker
    swGenerator.write(options.swFilePath, options, error => {
      if (error) {
        console.error(error.stack);
        process.exit(1);
      }
      console.log(options.swFilePath, 'has been generated with the service worker contents.');
    });
    // write ServiceWorker register
    fs.writeFileSync(`${options.swRegisterPath}/sw-register.js`, fs.readFileSync('./lib/sw-register.js'));
  })
  .parse(process.argv);

