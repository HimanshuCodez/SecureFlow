import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
            sameSite : process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({success:false, message: 'Email and password are required' });
    }

    try {
       
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({success:false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(401).json({success:false, message: 'Invalid credentials' });
        }

        // Generate token (assuming you have a method for this)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite : process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });
        res.status(201).json({ success: true, message: 'User logged in successfully' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite : process.env.NODE_ENV === 'production' ? 'None' : 'strict'});
        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}