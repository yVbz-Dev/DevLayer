const express = require('express');
const cors = require('cors');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login')
const app = express();
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());
app.use('/register', registerRoutes);
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
    res.json({ message : 'What are you doing here?'})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Dev layer backend is running')
})
