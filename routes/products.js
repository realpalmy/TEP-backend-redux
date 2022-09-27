const express = require('express');
const data = require('../data/productData');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(data);
});


router.get('/:id', (req, res) => {
    const productId = Number.parseInt(req.params.id);
    const product = data.find((product) => product.id === productId);
    res.json(product);
});

router.get('/category/:categoryID', (req, res) => {
    const productId = Number.parseInt(req.params.categoryID);
    const product = data.filter((product) => product.category.categoryID === productId);
    res.json(product);
});

let currentProductId = 40;
router.post('/', (req, res) => {
    const {
        imgUrl, title, category, detail, currentBid, buyNow, bitAmount, countDown, owner, winnerBid
    } = req.body;
    const product = {
        id: ++currentProductId,
        imgUrl,
        title,
        category: {
            categoryID: category.categoryID,
            caregoryName: category.caregoryName,
        },
        detail,
        currentBid,
        buyNow,
        bitAmount,
        countDown,
        owner,
        winnerBid,
    };
    data.push(product);
    res.json(product);
});

router.put('/:id', (req, res) => {
    const { name, imageURL, type } = req.body;
    const productId = Number.parseInt(req.params.id);
    const product = data.find((product) => product.id === productId);

    product.name = name;
    product.imageURL = imageURL;
    product.type = type;

    res.json(product);
});

module.exports = router;
