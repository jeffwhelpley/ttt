import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { initializeWebFragments } from 'web-fragments';

// Initialize web fragments before bootstrapping Angular
initializeWebFragments();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
