import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { db } from "./db";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: "http://localhost:3010/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"], // Request specific fields
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || ""; // Get the user's email
        const user = await db.user.upsert({
          where: { email },
          create: {
            email,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            avatarUrl: profile.photos?.[0]?.value || "",
            role: "USER",
          },
          update: {},
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
