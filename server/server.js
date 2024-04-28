const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Storage configuration for uploads to 'uploads/SeatLeak'
const storageSeatLeak = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/SeatLeak');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Storage configuration for uploads to 'uploads/Body'
const storageBody = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/Body');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Storage configuration for uploads to 'uploads/Needle'
const storageNeedle = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/Needle');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Middleware for handling uploads to 'uploads/SeatLeak'
const uploadSeatLeak = multer({ storage: storageSeatLeak }).array('files', 6);

// Middleware for handling uploads to 'uploads/Body'
const uploadBody = multer({ storage: storageBody }).array('files', 6);

// Middleware for handling uploads to 'uploads/Needle'
const uploadNeedle = multer({ storage: storageNeedle }).array('files', 6);

app.post('/upload/seatleak', uploadSeatLeak, (req, res) => {
    res.send('Files uploaded successfully');
});
app.post('/upload/body', uploadBody, (req, res) => {
    res.send('Files uploaded successfully');
});
app.post('/upload/needle', uploadNeedle, (req, res) => {
    res.send('Files uploaded successfully');
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});