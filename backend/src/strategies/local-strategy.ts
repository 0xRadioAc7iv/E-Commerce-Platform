import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePasswords } from "../lib/passwordHelpers";
import pool from "../db";

type User = {
  email: string;
  password: string;
};

passport.serializeUser((user, done) => {
  done(null, (user as User).email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];
    if (!user) throw new Error("User not found");
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
        if (!user) throw new Error("User not found");

        if (!comparePasswords(password, user.password))
          throw new Error("Invalid Credentials");
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
