const userModel = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller to handle user creation
const createUser = async (req, res) => {
    try {
        const { Name, Email, Address, password } = req.body;

        // Validate input
        if (!Name || !Email || !Address || !password) {
            return res.status(400).json({
                message: "All fields are required: Name, Email, Address, and Password.",
            });
        }

        // Check if the email already exists
        const isEmailExist = await userModel.findOne({ where: { Email } });
        if (isEmailExist) {
            return res.status(400).json({
                message: "Email already exists. Please use a different email.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await userModel.create({
            Name,
            Email,
            Address,
            password: hashedPassword, // Store the hashed password
        });

        // Respond with success
        return res.status(201).json({
            message: "User created successfully.",
            data: {
                id: newUser.id,
                Name: newUser.Name,
                Email: newUser.Email,
                Address: newUser.Address,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: "An error occurred while creating the user.",
            error: error.message,
        });
    }
};

// Controller to handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Check if the user exists
        const user = await userModel.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.Email },
            process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable for the secret
            { expiresIn: '1h' }
        );

        // Respond with token
        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                Name: user.Name,
                Email: user.Email,
                Address: user.Address,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            message: 'An error occurred while logging in.',
            error: error.message,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
};