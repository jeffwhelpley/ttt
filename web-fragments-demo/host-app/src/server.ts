import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { FragmentGateway } from 'web-fragments/gateway';
import { getNodeMiddleware } from 'web-fragments/gateway/node';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Create and configure the fragment gateway
const gateway = new FragmentGateway();

// Register Angular fragment
gateway.registerFragment({
  fragmentId: 'angular-fragment',
  endpoint: 'http://localhost:3001',
  routePatterns: ['/__wf/angular-fragment/:_*'],
});

// Register Vanilla JS fragment
gateway.registerFragment({
  fragmentId: 'vanilla-fragment',
  endpoint: 'http://localhost:3002',
  routePatterns: ['/__wf/vanilla-fragment/:_*'],
});

// Register React fragment
gateway.registerFragment({
  fragmentId: 'react-fragment',
  endpoint: 'http://localhost:3003',
  routePatterns: ['/__wf/react-fragment/:_*'],
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Use the web fragments middleware BEFORE serving static files
 * This allows fragment requests to be intercepted and proxied
 */
app.use(getNodeMiddleware(gateway));

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 3010;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
