import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      return user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
