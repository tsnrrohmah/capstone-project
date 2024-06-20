var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var teknisi = require('../controller/techniciancontroller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/technician');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

// Routes
router.get('/', teknisi.getAllteknisi);
router.get('/:id', teknisi.getteknisiId);
router.post('/', upload.single('gambar'), teknisi.createteknisi);
router.put('/:id', upload.single('gambar'), teknisi.updateteknisi);
router.delete('/:id', teknisi.deleteteknisi);

module.exports = router;




// var express = require('express');
// var router = express.Router();
// //import contoller
// var teknisi = require('../controller/techniciancontroller');
// var upload = require('../library/upload');
// /**
//  * INDEX Kelas
//  */
// router.get('/', teknisi.getAllteknisi);
// /*
//  * INDEX Kelas berdasarkan id
//  */
// router.get('/:id', teknisi.getteknisiId);
// /**
//  * STORE POST kelas
//  */


// router.post('/',teknisi.createteknisi);
// /*
//  * UPDATE kelas
//  */
// router.put('/:id', teknisi.updateteknisi);
// /*
//  * DELETE kelas
//  */
// router.delete('/:id', teknisi.deleteteknisi);




// module.exports = router;

