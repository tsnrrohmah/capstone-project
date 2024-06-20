var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
//import contoller
var admin = require('../controller/admincontroller')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/admin');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });
/**
 * INDEX Kelas
 */
router.get('/', admin.getAlladmin);
/*
 * INDEX Kelas berdasarkan id
 */
router.get('/:id', admin.getadminId);
/**
 * STORE POST kelas
 */
router.post('/',upload.single('gambar'),admin.createadmin);
/*
 * UPDATE kelas
 */
router.put('/:id', upload.single('gambar'),admin.updateadmin);
/*
 * DELETE kelas
 */
router.delete('/:id', admin.deleteadmin);




module.exports = router;