const express = require('express');
const data = require('../data/productData');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(data);
});

module.exports = router;
