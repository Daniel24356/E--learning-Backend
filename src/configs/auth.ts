import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient, GoogleUser } from '@prisma/client';

const prisma = new PrismaClient();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'], 
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user exists
        // const googleId = profile.id;


        let user = await prisma.googleUser.findUnique({
          where: { googleId: profile.id},
        });

        // If not, create a new user
        if (!user) {
          user = await prisma.googleUser.create({
            data: {
              googleId: profile.id,
              email: profile.emails ? profile.emails[0].value : '',
              name: profile.displayName || 'Unknown',
              avatarUrl: profile.photos ? profile.photos[0].value : '',
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
    
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, (user as GoogleUser).id);
});

// Deserialize user
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
