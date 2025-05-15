const storeModel = require('../models/store.js');

const getAllStores = async (req, res) => {
    try {
        const stores = await storeModel.findAll(); // Fetch all stores
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ message: 'An error occurred while fetching stores.' });
    }
};

const createStore = async (req, res) => {
    try {
        const { name, email, address, rating } = req.body;

        // Validate input
        if (!name || !email || !address || rating === undefined) {
            return res.status(400).json({ message: 'All fields are required: name, email, address, and rating.' });
        }

        // Create a new store
        const newStore = await storeModel.create({ name, email, address, rating });
        res.status(201).json({ message: 'Store created successfully.', data: newStore });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'An error occurred while creating the store.' });
    }
};

const rateStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { rating } = req.body;

        // Validate input
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
        }

        // Find the store by ID
        const store = await storeModel.findByPk(storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found.' });
        }

        // Update the store's rating (this is a simple example; you can implement a more complex rating system)
        store.rating = (store.rating ? (store.rating + rating) / 2 : rating).toFixed(1); // Average rating
        await store.save();

        res.status(200).json({ message: 'Rating submitted successfully.', store });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ message: 'An error occurred while submitting the rating.' });
    }
};

const getStoreById = async (req, res) => {
    try {
        const { storeId } = req.params;

        // Find the store by ID, including its ratings
        const store = await storeModel.findByPk(storeId, {
            include: [
                {
                    model: require('../models/rating.js'), // Assuming you have a Rating model
                    as: 'ratings', // Alias for the relationship
                },
            ],
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found.' });
        }

        // Calculate the average rating
        const averageRating =
            store.ratings && store.ratings.length > 0
                ? (
                      store.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                      store.ratings.length
                  ).toFixed(1)
                : null;

        // Respond with store details and ratings
        res.status(200).json({
            id: store.id,
            name: store.name,
            address: store.address,
            averageRating: averageRating || 'No ratings yet',
            ratings: store.ratings,
        });
    } catch (error) {
        console.error('Error fetching store by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the store.' });
    }
};

module.exports = {
    getAllStores,
    createStore,
    rateStore,
    getStoreById,
};