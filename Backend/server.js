import express from 'express';
import cors from 'cors';
import "./Database.js";
import bcrypt from 'bcrypt';
import User from './MongoDBModels/User.js';
import UserProfile from './MongoDBModels/UserProfile.js';
import Donation from './MongoDBModels/Donation.js';
const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            // If user not found, return 404 with a message
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // If passwords don't match, return 401 with a message
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // If login is successful, find the user profile
        const userProfile = await UserProfile.findOne({ user: user._id });

        if (!userProfile) {
            // If user profile not found, return 404 with a message
            return res.status(404).json({ message: 'User profile not found' });
        }

        // Return success response with user _id and role from the profile
        res.status(200).json({ message: 'Login successful', success: true, userid: user._id, role: userProfile.role });
    } catch (error) {
        // Handle any server error during login process
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/signup', async (req, res) => {
    const { role , Fullname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

    
        const savedUser = await newUser.save();

        
        const newUserProfile = new UserProfile({
            role : role,
            fullName: Fullname,
            user: savedUser._id, 
        });

        const savedUserProfile = await newUserProfile.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: savedUser._id,
            role : role
        });
    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

app.post("/donation", async (req, res) => {
    const {
        type,
        quantity,
        expirationDate,
        pickupInstructions,
        contactName,
        contactEmail,
        contactPhone,
        location
    } = req.body;

    const userId = req.headers.userid; 

    try {
        const profile = await UserProfile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'User profile not found for the provided userId' });
        }

        
        const newDonation = new Donation({
            type,
            quantity,
            expirationDate,
            pickupInstructions,
            contactName,
            contactEmail,
            contactPhone,
            location,
            userProfile: profile._id // Associate the donation with the userProfile
        });

        // Save the new donation to the database
        const savedDonation = await newDonation.save();

        // Update the user profile's donations array with the new donation _id
        profile.donations.push(savedDonation._id);
        await profile.save();

        res.status(200).json({
            message: 'Donation created successfully',
            donation: savedDonation
        });
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Failed to create donation' });
    }
});

app.get('/donationRequest', async (req, res) => {
    const userId = req.headers.userid; // Get userId from request headers

    try {
        // Find the user profile associated with the userId
        const profile = await UserProfile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'User profile not found for the provided userId' });
        }

        // Retrieve all donations associated with the user profile
        const donations = await Donation.find({ userProfile: profile._id, RequestStatus : true});

        res.status(200).json({
            message: 'Donations retrieved successfully',
            donations
        });
    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({ message: 'Failed to retrieve donations' });
    }
});

app.get('/donationHistory', async (req, res) => {
    const userId = req.headers.userid; // Get userId from request headers

    try {
        // Find the user profile associated with the userId
        const profile = await UserProfile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'User profile not found for the provided userId' });
        }

        const donations = await Donation.find({ 
            userProfile: profile._id,
            RequestStatus: { $in: ['Pending', 'Accepted'] }
        });

        res.status(200).json({
            message: 'Donations retrieved successfully',
            donations
        });
    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({ message: 'Failed to retrieve donations' });
    }
});








app.listen(3000, () => {
    console.log("Listening on Post 3000");
})