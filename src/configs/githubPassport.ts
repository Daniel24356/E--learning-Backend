// import { Strategy as GitHubStrategy } from "passport-github2";
// import { db } from "./db";
// import passport from "passport";

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//       callbackURL: "http://localhost:3010/auth/github/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value; // GitHub profile email
//         const user = await db.user.upsert({
//           where: { email },
//           create: {
//             email,
//             firstName: profile.displayName || profile.username,
//             avatarUrl: profile.photos?.[0]?.value || "",
//             role: "USER",
//           },
//           update: {},
//         });
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );
