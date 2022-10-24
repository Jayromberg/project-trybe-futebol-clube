import passport = require('passport');
import { App } from './app';
import 'dotenv/config';
import 'express-async-errors';

import passportStrategy from './services/auth/passport.strategy';

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
passportStrategy(passport);
