import express from 'express';
import { FragmentGateway } from 'web-fragments/gateway';
import { getNodeMiddleware } from 'web-fragments/gateway/node';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3010;

// Create and configure the fragment gateway
const gateway = new FragmentGateway();

// Register Angular fragment
gateway.registerFragment({
  fragmentId: 'angular-fragment',
  endpoint: 'http://localhost:3001',
  routePatterns: ['/__wf/angular-fragment/:_*', '/'],
  piercingClassNames: [],
});

// Register Vanilla JS fragment
gateway.registerFragment({
  fragmentId: 'vanilla-fragment',
  endpoint: 'http://localhost:3002',
  routePatterns: ['/__wf/vanilla-fragment/:_*', '/'],
  piercingClassNames: [],
});

// Register React fragment
gateway.registerFragment({
  fragmentId: 'react-fragment',
  endpoint: 'http://localhost:3003',
  routePatterns: ['/__wf/react-fragment/:_*', '/'],
  piercingClassNames: [],
});

// Use the web fragments middleware
app.use(getNodeMiddleware(gateway));

// Serve static files from the Angular build
app.use(express.static(path.join(__dirname, 'dist/host-app/browser')));

app.listen(port, () => {
  console.log(`Host app running at http://localhost:${port}`);
});
