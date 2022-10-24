import { App } from './app';
import 'dotenv/config';
import 'express-async-errors';

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
