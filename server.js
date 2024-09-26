const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const sequelize = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));
// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error creating database:', err);
  });

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
