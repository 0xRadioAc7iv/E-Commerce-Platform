import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compareText } from "../lib/hashing";
import pool from "../db";

type User = {
  id: number;
  email: string;
  password: string;
};

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];
    if (!user) return done(null, false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const result = await pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [email]
        );
        const user = result.rows[0];

        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        const isPasswordValid = compareText(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (error) {
        console.error("Authentication error:", error);
        return done(null, false, {
          message: "An error occurred. Please try again later.",
        });
      }
    }
  )
);
