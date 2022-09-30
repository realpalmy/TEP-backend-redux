const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const multer = require('multer');

const productRoutes = require('./routes/products');
const userLoginRoutes = require('./routes/login');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('/assets/img'));

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use('/products', cors(corsOptions), productRoutes);
app.use('/login', cors(corsOptions), userLoginRoutes);


app.listen(8000, () => {
    console.log('Listening on port 8000');
});