import express from 'express';
import cors from 'cors';
import "./Database.js";
import bcrypt from 'bcrypt';
import User from './MongoDBModels/User.js';
import UserProfile from './MongoDBModels/UserProfile.js';
import Donation from './MongoDBModels/Donation.js';
import Blog from './MongoDBModels/Blog.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ email: username });
        console.log(user);


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
        res.status(200).json({ message: 'Login successfull', success: true, userid: user._id, role: userProfile.role, userProfile, user });
    } catch (error) {
        // Handle any server error during login process
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/signup', async (req, res) => {
    const { role, Fullname, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Create a new user profile
        const newUserProfile = new UserProfile({
            role: role,
            fullName: Fullname,
            user: savedUser._id,
        });

        const savedUserProfile = await newUserProfile.save();

        res.status(200).json({
            message: 'User registered successfully',
            user: savedUser._id,
            role: newUserProfile.role,
            userDetails: newUser,
            userProfile: newUserProfile
        });
    } catch (error) {
        console.error('User registration error:', error);

        // Handle MongoDB duplicate key error explicitly
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Failed to register user' });
    }
});


app.post("/donation", async (req, res) => {
    const {
        type,
        weight, // Updated from quantity
        dimensions, // New field
        description, // New field
        pickupInstructions,
        contactName,
        contactEmail,
        contactPhone,
        location,
    } = req.body;

    const userId = req.headers.userid;

    try {
        // Find the user's profile using the userId from the headers
        const profile = await UserProfile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: "User profile not found for the provided userId" });
        }

        // Create a new donation entry
        const newDonation = new Donation({
            type,
            weight, // Updated field
            dimensions, // Added field
            description, // Added field
            pickupInstructions,
            contactName,
            contactEmail,
            contactPhone,
            location,
            userProfile: profile._id, // Associate the donation with the user's profile
        });

        // Save the new donation to the database
        const savedDonation = await newDonation.save();

        // Update the user profile's donations array with the new donation ID
        profile.donations.push(savedDonation._id);
        await profile.save();

        res.status(200).json({
            message: "Donation created successfully",
            donation: savedDonation,
        });
    } catch (error) {
        console.error("Error creating donation:", error);
        res.status(500).json({ message: "Failed to create donation" });
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
        const donations = await Donation.find({ userProfile: profile._id, RequestStatus: true });

        // Manually fetch details for `lastAcceptedBy` for each donation
        const donationsWithDetails = await Promise.all(
            donations.map(async (donation) => {
                if (donation.lastAcceptedBy) {
                    const lastAcceptedByDetails = await UserProfile.findById(donation.lastAcceptedBy);
                    return {
                        ...donation._doc, // Spread donation data
                        lastAcceptedBy: lastAcceptedByDetails || null, // Include the user profile details or null if not found
                    };
                }
                return donation._doc; // Return donation as is if `lastAcceptedBy` is null
            })
        );

        res.status(200).json({
            message: 'Donations retrieved successfully',
            donations: donationsWithDetails,
        });
    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({ message: 'Failed to retrieve donations' });
    }
});

app.get('/donationHistory', async (req, res) => {
    const userId = req.headers.userid; // Get userId from request headers

    try {
        // Validate the userId
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required in the request headers.' });
        }

        // Find the user profile associated with the userId
        const profile = await UserProfile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'User profile not found for the provided userId.' });
        }

        // Retrieve donations for the user
        const donations = await Donation.find({
            userProfile: profile._id,
            RequestStatus: { $in: ['Pending', 'Accepted', 'Cancelled'] },
        });

        // Process donations and fetch `lastAcceptedBy` details manually if necessary
        const processedDonations = await Promise.all(
            donations.map(async (donation) => {
                let ngoDetails = null;

                // Fetch `lastAcceptedBy` details if donation is not cancelled and `lastAcceptedBy` exists
                if (!donation.isCancelled && donation.lastAcceptedBy) {
                    ngoDetails = await UserProfile.findById(donation.lastAcceptedBy);
                }

                return {
                    ...donation.toObject(), // Convert the Mongoose document to a plain object
                    ngoDetails: ngoDetails
                };
            })
        );

        // Respond with the processed donations
        res.status(200).json({
            message: 'Donations retrieved successfully',
            donations: processedDonations,
        });
    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({ message: 'Failed to retrieve donations. Please try again later.' });
    }
});





app.post('/blog', async (req, res) => {
    const { title, author, content } = req.body;

    try {
        // Create a new Blog document using the Blog model
        const newBlog = new Blog({
            title,
            author,
            content
        });

        // Save the new Blog document to the database
        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog); // Respond with the saved blog post
    } catch (error) {
        console.error('Error saving blog post:', error);
        res.status(500).json({ message: 'Failed to save blog post' });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        // Fetch all blogs from the database, but only select specific fields
        const blogs = await Blog.find({}, 'title author createdAt');

        res.status(200).json(blogs); // Respond with the selected fields of all blogs
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
});

app.get('/blogs/:id', async (req, res) => {
    const { id } = req.params; // Extract blog ID from URL parameters

    try {
        // Find a blog by its ID in the database
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog); // Respond with the details of the blog
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ message: 'Failed to fetch blog' });
    }
});

app.get('/ngo/donationlist', async (req, res) => {
    try {
        // Pagination parameters
        const { page = 1, limit = 10 } = req.query;

        // Fetch donations with status 'Pending' and paginate
        const donations = await Donation.find({ RequestStatus: { $in: ['Pending', 'Cancelled'] } })
            .populate('userProfile', 'fullName') // Populate userProfile with fullName
            .sort({ createdAt: -1 })


        // Count total donations for metadata
        const totalDonations = await Donation.countDocuments({ RequestStatus: 'Pending' });

        res.status(200).json({
            message: 'Pending donations retrieved successfully',
            donations,
            metadata: {
                totalDonations,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalDonations / limit),
            },
        });
    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({ message: 'Failed to retrieve donations' });
    }
});

app.get('/ngo/donationlist', async (req, res) => {
    try {
        // Pagination parameters
        const { page = 1, limit = 10 } = req.query;

        // Fetch donations with status 'Pending' and paginate
        const donations = await Donation.find({ RequestStatus: 'Pending' })
            .populate('userProfile', 'fullName') // Populate userProfile with fullName
            .sort({ createdAt: -1 }) // Sort by newest first
            .exec();

        // Count total donations for metadata
        const totalDonations = await Donation.countDocuments({ RequestStatus: 'Pending' });

        res.status(200).json({
            message: 'Pending donations retrieved successfully',
            donations,
            metadata: {
                totalDonations,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalDonations / limit),
            },
        });
    } catch (error) {
        console.error('Error retrieving donations:', error);
        res.status(500).json({ message: 'Failed to retrieve donations' });
    }
});

app.post('/ngo/donation/:id/accept', async (req, res) => {
    const { id } = req.params;
    const { ngoId } = req.body; // Get the NGO ID from the request body

    try {
        // Find the donation by ID
        const donation = await Donation.findById(id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Update the donation's fields
        donation.RequestStatus = 'Accepted';
        donation.isCancelled = false; // Reset the cancellation status
        donation.acceptedBy.push(ngoId); // Add the NGO to the acceptedBy array
        donation.lastAcceptedBy = ngoId; // Update the last accepted by field

        // Save the updated donation
        await donation.save();

        res.status(200).json({
            message: 'Donation accepted successfully',
            donation
        });
    } catch (error) {
        console.error('Error updating donation status:', error);
        res.status(500).json({ message: 'Failed to accept donation' });
    }
});

app.post('/ngo/donation/:id/cancel', async (req, res) => {
    console.log('cancel');

    const { id } = req.params;

    try {
        // Find the donation by ID
        const donation = await Donation.findById(id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Update the donation's status to canceled
        donation.RequestStatus = 'Cancelled';
        donation.isCancelled = true;
        donation.lastAcceptedBy = null; // Clear the last accepted by field

        // Save the updated donation
        await donation.save();

        res.status(200).json({
            message: 'Donation canceled successfully',
            donation
        });
    } catch (error) {
        console.error('Error canceling donation:', error);
        res.status(500).json({ message: 'Failed to cancel donation' });
    }
});

app.get('/ngo/getAcceptedDonations/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Find the donation by ID 
        const user = await User.findById(id);
        console.log(user);


        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const donationlist = await Donation.find({ lastAcceptedBy: id });

        res.status(200).json({
            message: 'Donation Found successfully',
            donationlist
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed fetch Donations', error });
    }
});



app.listen(3000, () => {
    console.log("Listening on Post 3000");
})