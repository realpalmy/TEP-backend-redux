const express = require('express');
const data = require('../data/productData');
const multer = require('multer');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(data);
});

router.get('/random', (req, res) => {
    const x = Array(20).fill().map(() => Math.round(Math.random() * 50));
    const product = data.filter((item) => x.includes(item.id));
    res.json(product);
});

router.get('/:id', (req, res) => {
    const productId = Number.parseInt(req.params.id);
    const product = data.find((product) => product.id == productId);
    res.json(product);
});

router.get('/category/:categoryID', (req, res) => {
    const productId = Number.parseInt(req.params.categoryID);
    const product = data.filter((product) => product.category.categoryID == productId);
    res.json(product);
});

let currentProductId = 50;

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // limit 5MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(undefined, true);
    }
});

router.post('/upload', upload.single('file'), (req, res) => {
    res.send(req.file);
});

router.get('/img/:file', (req, res) => {
    const filePath = `${process.cwd()}/assets/img/${req.params.file}`;
    res.sendFile(filePath);
});

router.put('/update/:id', (req, res) => {
    const { currentBid } = req.body;
    const productId = Number.parseInt(req.params.id);
    const product = data.find((product) => product.id === productId);
    product.currentBid = currentBid;
    res.json(product);
});



const showImg = (req, res) => {
    const filePath = `${process.cwd()}/assets/img/${req.params.id}`;
    res.sendFile(filePath);
};

module.exports = router;
