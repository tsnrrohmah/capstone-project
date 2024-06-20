var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
//import contoller
var users = require('../controller/userscontroller')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/users');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

/**
 * INDEX Kelas
 */
router.get('/', users.getAllusers);
/*
 * INDEX Kelas berdasarkan id
 */
router.get('/:id', users.getusersId);
/**
 * STORE POST kelas
 */
router.post('/',upload.single('gambar'),users.createusers);
/*
 * UPDATE kelas
 */
router.put('/:id', upload.single('gambar'),users.updateusers);
/*
 * DELETE kelas
 */
router.delete('/:id', users.deleteusers);




module.exports = router;
