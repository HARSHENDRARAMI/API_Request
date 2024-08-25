const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = "";

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "your_name_ddmmyyyy", // replace with actual data
        email: "your_email@college.com", // replace with actual data
        roll_number: "your_roll_number", // replace with actual data
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
