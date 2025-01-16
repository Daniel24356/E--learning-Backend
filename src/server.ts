import express, { Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from './configs/auth';

dotenv.config();

const app = express();

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  }),
  (req: Request, res: Response) => {
    res.redirect('/dashboard');
  }
);

app.get('/dashboard', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${(req.user as any).name}`);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
