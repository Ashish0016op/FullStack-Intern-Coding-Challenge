const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);


(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      await sequelize.sync({ alter: true });
      console.log('All models synced successfully.');
      const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();



