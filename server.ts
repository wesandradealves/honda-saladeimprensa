/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as basicAuth from 'express-basic-auth';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import 'localstorage-polyfill'

global['localStorage'] = localStorage;
const domino = require("domino");
const fs = require("fs");
const path = require("path");
const templateA = fs
  .readFileSync(path.join("dist/honda/browser", "index.html"))
  .toString();
const win = domino.createWindow(templateA);
const _environment = process.env.ENVIRONMENT || 'develop';
win.Object = Object;
win.Math = Math;

global["window"] = win;
global["document"] = win.document;
global["branch"] = null;
global["object"] = win.object;
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/honda/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // enable basic auth on non production environments
  if(process.env.ENABLE_BASIC_AUTH === 'true') {
    server.use(basicAuth({
        users: { 'honda': 'HML*2021@db' },
        challenge: true
    }));
  }

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y',
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 3000;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on https://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
