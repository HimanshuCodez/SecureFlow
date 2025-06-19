import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail, verifyResetOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/verify-reset-otp', verifyResetOtp);

authRouter.post('/reset-password',resetPassword);
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://secure-flow-auth.vercel.app/login',
    session: false
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect('https://secure-flow-auth.vercel.app/social-auth-success');
  }
);

export default authRouter;





