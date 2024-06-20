var path = require('path');
const fs = require('fs');
var connection = require('../library/database');

const getAllorder = function (req, res) {
    connection.query('SELECT * FROM tbl_orders', function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getorderId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM tbl_orders WHERE id_pesanan = ' + id, function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createorder = function (req, res) {
    console.log('Request body:', req.body);

    try {
        const { id_admin, id_user, id_teknisi, id_katagori, tanggal_bayar, tanggal_pelayanan, total_harga, opsi_pembayaran, status } = req.body;
        const bukti_pembayaran = req.file ? req.file.filename : null;

        // Modify validation to allow id_admin and id_teknisi to be null
        if (!id_user || !id_katagori || !tanggal_bayar || !total_harga || !opsi_pembayaran || !status) {
            return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
        }

        const formData = {
            id_admin: id_admin || null, // Set to null if id_admin is not provided
            id_user: id_user,
            id_teknisi: id_teknisi || null, // Set to null if id_teknisi is not provided
            id_katagori: id_katagori,
            tanggal_bayar: tanggal_bayar,
            tanggal_pelayanan: tanggal_pelayanan,
            total_harga: total_harga,
            opsi_pembayaran: opsi_pembayaran,
            bukti_pembayaran: bukti_pembayaran,
            status: status
        };

        connection.query('INSERT INTO tbl_orders SET ?', formData, function (err, result) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Data gagal disimpan, terjadi kesalahan di database' });
            }
            res.status(201).json({ success: true, message: 'Data Berhasil Disimpan!' });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, error: 'Terjadi kesalahan server' });
    }
};

const deleteorder = function (req, res) {
    let id = req.params.id;

    // Query to get the filename of the payment proof from the database
    connection.query('SELECT bukti_pembayaran FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, rows) {
        if (err) {
            res.status(500).send('Error querying the database: ' + err);
            return;
        }

        if (rows.length === 0) {
            res.status(404).send('Order not found');
            return;
        }

        let bukti_pembayaran = rows[0].bukti_pembayaran;

        if (bukti_pembayaran) {
            let bukti_pembayaranPath = path.join(__dirname, '../public/uploads/order', bukti_pembayaran);

            // Check if the file exists before attempting to delete
            fs.access(bukti_pembayaranPath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.log('Payment proof file not found:', bukti_pembayaranPath);
                    // Proceed to delete the order from the database regardless of the file's existence
                    deleteOrderFromDB(id, res);
                } else {
                    // If the file exists, delete it
                    fs.unlink(bukti_pembayaranPath, (err) => {
                        if (err) {
                            res.status(500).send('Error deleting payment proof file: ' + err);
                            return;
                        }
                        // Now delete the order from the database
                        deleteOrderFromDB(id, res);
                    });
                }
            });
        } else {
            // If there's no payment proof file, just delete the order from the database
            deleteOrderFromDB(id, res);
        }
    });
};

function deleteOrderFromDB(id, res) {
    connection.query('DELETE FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, result) {
        if (err) {
            res.status(500).send('Error deleting order: ' + err);
            return;
        }
        res.send('Order deleted successfully, payment proof file may not have been present.');
    });
}

// const updateorder = function (req, res) {
//     let formData = {
//         id_admin: req.body.id_admin,
//         id_user: req.body.id_user,
//         id_teknisi: req.body.id_teknisi,
//         tanggal_bayar: req.body.tanggal_bayar,
//         tanggal_pelayanan: req.body.tanggal_pelayanan,
//         total_harga: req.body.total_harga,
//         status: req.body.status
//     };

//     // Check if a new file is uploaded
//     if (req.file) {
//         formData.bukti_pembayaran = req.file.filename;
//     } else {
//         // If no file is uploaded, do not include bukti_pembayaran in the update
//         formData.bukti_pembayaran = req.body.existing_bukti_pembayaran || null;
//     }

//     connection.query('UPDATE tbl_orders SET ? WHERE id_pesanan = ?', [formData, req.params.id], function (err, result) {
//         if (err) {
//             console.error('Database error:', err);
//             res.status(500).send('Error updating order');
//         } else {
//             res.send('Data Berhasil Diupdate!');
//         }
//     });
// };


const updateorder = function (req, res) {
    let id = req.params.id;
    let id_admin = req.body.id_admin;
    let id_user = req.body.id_user;
    let id_teknisi = req.body.id_teknisi;
    let tanggal_bayar = req.body.tanggal_bayar;
    let tanggal_pelayanan = req.body.tanggal_pelayanan;
    let total_harga = req.body.total_harga;
    let buktiPembayaranBaru = req.file ? req.file.filename : null;
    let status = req.body.status;
    let errors = false;

    // Validasi input
    if (!id_admin) {
        errors = true;
        res.json({ pesan: 'Field id_admin belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!id_user) {
        errors = true;
        res.json({ pesan: 'Field id_user belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!id_teknisi) {
        errors = true;
        res.json({ pesan: 'Field id_teknisi belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!tanggal_bayar) {
        errors = true;
        res.json({ pesan: 'Field tanggal_bayar belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!tanggal_pelayanan) {
        errors = true;
        res.json({ pesan: 'Field tanggal_pelayanan belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!total_harga) {
        errors = true;
        res.json({ pesan: 'Field total_harga belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!status) {
        errors = true;
        res.json({ pesan: 'Field status belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    // Query untuk mendapatkan bukti_pembayaran lama
    connection.query('SELECT bukti_pembayaran FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, rows) {
        if (err) {
            res.send('error', err);
            return;
        }

        let buktiPembayaranLama = rows.length > 0 ? rows[0].bukti_pembayaran : null;

        // Jika ada bukti pembayaran baru dan bukti pembayaran lama, hapus bukti pembayaran lama
        if (buktiPembayaranBaru && buktiPembayaranLama) {
            let buktiPembayaranPath = path.join(__dirname, '../public/uploads/order', buktiPembayaranLama);
            fs.unlink(buktiPembayaranPath, (err) => {
                if (err) {
                    console.log('Gagal menghapus bukti pembayaran lama: ', err);
                }
            });
        }

        // Jika ada bukti pembayaran baru, gunakan itu, jika tidak, gunakan bukti pembayaran lama
        let bukti_pembayaran = buktiPembayaranBaru ? buktiPembayaranBaru : buktiPembayaranLama;

        let formData = {
            id_admin: id_admin,
            id_user: id_user,
            id_teknisi: id_teknisi,
            tanggal_bayar: tanggal_bayar,
            tanggal_pelayanan: tanggal_pelayanan,
            total_harga: total_harga,
            bukti_pembayaran: bukti_pembayaran,
            status: status
        };

        // Update query
        connection.query('UPDATE tbl_orders SET ? WHERE id_pesanan = ?', [formData, id], function (err, result) {
            if (err) {
                res.send('error', err);
                return;
            }

            res.send('Data Berhasil Diupdate!');
        });
    });
};





module.exports = updateorder;





module.exports = {
  getAllorder,
  getorderId,
  createorder,  // Ensure this is listed
  updateorder,
  deleteorder
};