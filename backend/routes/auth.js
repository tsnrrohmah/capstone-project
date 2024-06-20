const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../library/authConfig'); // Mengimpor db dari authConfig.js

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, alamat, no_hp } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const [result] = await db.pool.execute(
            'INSERT INTO tbl_users (username, email, password, alamat, no_hp) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, alamat, no_hp]
        );

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin registration
router.post('/admin/register', async (req, res) => {
    try {
        const { username, email, password, alamat, no_hp, role } = req.body;

        // Validate role
        if (!['admin', 'superadmin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Dapatkan koneksi dari pool
        const connection = await db.pool.getConnection();

        // Insert new admin into the database
        const [result] = await connection.execute(
            'INSERT INTO tbl_admins (username, email, password, alamat, no_hp, role) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, alamat, no_hp, role]
        );

        // Lepaskan koneksi
        connection.release();

        res.status(201).json({ message: 'Admin registered successfully!' });
    } catch (error) {
        console.error('Error registering admin:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const [rows] = await db.pool.execute('SELECT * FROM tbl_users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id_user, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id_user: user.id_user,
                username: user.username,
                no_hp: user.no_hp,
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin login
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const [rows] = await db.pool.execute('SELECT * FROM tbl_admins WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const admin = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: admin.id_admin, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });

        // res.json({ token });

        // Ku Ubah di bawah
        res.json({
            token,
            admin: {
                id: admin.id_admin,
                username: admin.username,
                email: admin.email,
                alamat: admin.alamat,
                no_hp: admin.no_hp,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
