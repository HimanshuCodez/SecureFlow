import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../utility/nodemailer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });

        // Load and personalize welcome email template
        const emailTemplate = fs.readFileSync(path.join(__dirname, '../utility/welcome_template.html'), 'utf-8');
        const personalizedEmail = emailTemplate.replace('{{name}}', name);

        // Sending welcome email
        const mailOptions = {
            from: `"SecureFlow Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to SecureFlow',
            html: personalizedEmail
        };
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
        res.status(201).json({ success: true, message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Important
        });
        res.status(200).json({ success: true, message: 'User logged in successfully', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });
        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
export const sendVerifyOtp = async (req, res) => {


    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if (user.isAccountVerified) {
            return res.status(200).json({ success: false, message: 'Account already Verified' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        const otpTemplate = fs.readFileSync(path.join(__dirname, '../utility/otpTemplate.html'), 'utf-8');
        let otpHTML = otpTemplate
            .replace('{{name}}', user.name)
            .replace('{{otp}}', otp);
        const mailOptions = {
            from: `"SecureFlow Team" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Account Verification OTP',
            html: otpHTML
        };
        await transporter.sendMail(mailOptions);
        console.log('otp email sent successfully');
        res.status(200).json({ success: true, message: 'otp email sent successfully' });

    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
const userId = req.userId;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: 'User ID and OTP are required' });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.isAccountVerified) {
            return res.status(200).json({ success: false, message: 'Account already verified' });
        }

        if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        res.status(200).json({ success: true, message: 'Account verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: 'User is authenticated' });
    } catch (error) {
        res.json({ success: false, message: 'Error checking authentication' });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        const resetOtpTemplate = fs.readFileSync(path.join(__dirname, '../utility/resetOtp.html'), 'utf-8');
        let resetOtpHTML = resetOtpTemplate
            .replace('{{name}}', user.name)
            .replace('{{otp}}', otp);
        const mailOptions = {
            from: `"SecureFlow Team" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Password Reset OTP',
            html: resetOtpHTML
        };
        await transporter.sendMail(mailOptions);
        console.log('otp email sent successfully');


        res.status(200).json({ success: true, message: 'Password reset otp sent  successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP and new password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error("Error verifying reset OTP:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
