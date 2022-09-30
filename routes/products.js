const express = require('express');
const data = require('../data/productData');
const multer = require('multer');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(data);
});

router.get('/onbid/:id', (req, res) => {
    const userID = Number.parseInt(req.params.id);
    const products = data.map((item) => {
        if (item.bitAmount.includes(userID)) return item
    }).filter(v => v != undefined);
    res.json(products);
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

// router.get('/winner/:productid', (req, res) => {
//     const productId = Number.parseInt(req.params.productid);
//     const product = data.filter((product) => product.id == productId);
//     res.json(product.winnerBid);
// });

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

router.get('/owner/:id', (req, res) => {
    const ownerId = Number.parseInt(req.params.id);
    const productOwn = data.filter((product) => product.owner == ownerId);
    res.json(productOwn);
});

router.put('/update/:id', (req, res) => {
    const { currentBid, userid, winnerBid } = req.body;
    const productId = Number.parseInt(req.params.id);
    const product = data.find((product) => product.id == productId);
    product.currentBid = currentBid;
    product.winnerBid = winnerBid;
    product.bitAmount.push(userid);
    const x = [...new Set(product.bitAmount)];
    product.bitAmount = x;
    res.json(product);
});

router.put('/buynow/:id', (req, res) => {
    const { time, winnerBid } = req.body;
    const productId = Number.parseInt(req.params.id);
    const product = data.find((product) => product.id == productId);
    product.countDown = time;
    product.winnerBid = winnerBid;
    res.json(product);
});

router.delete('/:id', (req, res) => {
    const productId = Number.parseInt(req.params.id);
    const productIndex = data.findIndex((product) => product.id === productId);
    data.splice(productIndex, 1);
    res.sendStatus(204);
});

const showImg = (req, res) => {
    const filePath = `${process.cwd()}/assets/img/${req.params.id}`;
    res.sendFile(filePath);
};

module.exports = router;
