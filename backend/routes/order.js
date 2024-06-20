var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var order = require('../controller/ordercontroller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/order');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

// Routes
router.get('/', order.getAllorder);
router.get('/:id',order.getorderId);
router.post('/', upload.single('bukti_pembayaran'), order.createorder);
router.put('/:id', upload.single('bukti_pembayaran'), order.updateorder);
router.delete('/:id', order.deleteorder);



module.exports = router;
