var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var kategori = require('../controller/catagoriscontroller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/catagori');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

// Routes
router.get('/', kategori.getAllcatagori);
router.get('/:id', kategori.getcatagoriId);
router.post('/', upload.single('gambar'), kategori.createcatagori);
router.put('/:id', upload.single('gambar'), kategori.updatecatagori);
router.delete('/:id', kategori.deletecatagori);

module.exports = router;