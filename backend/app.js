var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser'); // Menambahkan middleware body-parser
const authRoutes = require('./routes/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var teknisiRouter = require('./routes/technician');
var orderRouter = require('./routes/order');
var catagoriRouter = require('./routes/catagori');

var app = express();
const PORT = process.env.PORT || 8080; // Mendefinisikan PORT

// Middleware CORS untuk mengizinkan permintaan dari domain lain
app.use(cors({
  origin: ['http://localhost:3000','https://fe-msib-6-penyedia-jasa-02.educalab.id'], // Gantilah ini dengan domain frontend Anda jika berbeda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  credentials: true // Jika Anda memerlukan pengelolaan kredensial seperti cookies
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/teknisi', teknisiRouter);
app.use('/order', orderRouter);
app.use('/kategori', catagoriRouter);
app.use('/auth', authRoutes); // Menggunakan routes untuk autentikasi

// Middleware untuk parsing body dari request menjadi JSON
app.use(bodyParser.json());

// Penanganan error global untuk keseluruhan aplikasi
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
});

// Mendaftarkan aplikasi Express untuk mendengarkan permintaan pada PORT tertentu

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
