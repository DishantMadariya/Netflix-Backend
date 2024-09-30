const User = require('../models/User');
const bcrypt = require('bcrypt');

const generateTokenAndSetCookie = require('../utils/generateToken');

module.exports.register = async (req, res) => {
    try {
        // Retrive data from the request body
        const { username, email, password } = req.body;
        // Validate the data
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!username || !email || !password){
            return res.status(400).json({success: false, message: 'All fields are required' });
        } else if (password.length < 6) {
            return res.status(400).json({success: false, message: 'Password must be at least 6 characters' });
        } else if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: 'Invalid email address' });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingUser || existingUsername) {
            // If the user already exists, return an error message
            let response = existingUser ? 'User already exists' : 'Username already exists';
            return res.status(400).json({success: false, message: response });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({success: true, data: newUser, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        // Retrive data from the request body
        const { email, username, password } = req.body;
        // Validate the data
        if (!email && !username || !password) {
            return res.status(400).json({success: false, message: 'All fields are required' });
        }
        let user = email ? await User.findOne({ email }) : await User.findOne({ username });
        // Check if the user exists
        if (!user) {
            return res.status(400).json({success: false, message: 'User not found' });
        }
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: 'Invalid password' });
        }
        // Generate a token and set it as a cookie
        const token = generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({success: true, token });
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie(process.env.JWT_SECRET);
        res.status(200).json({success: true, message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};