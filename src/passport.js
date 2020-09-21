import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// Below called by all http requests because of express use()
export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    if (user) {
      // If token is matched, include user information to http request
      req.user = user;
    }
    next();
  })(req, res, next);

// Token is made by id, so make id by decryption. And check matching id by verifyUser()
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
