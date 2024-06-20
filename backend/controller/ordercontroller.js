var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX order
 */
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



const updateorder = function (req, res) {
    let id_admin = req.body.id_admin;
    let id_user = req.body.id_user;
    let id_teknisi = req.body.id_teknisi;

    let tanggal_bayar = req.body.tanggal_bayar;
    let tanggal_pelayanan = req.body.tanggal_pelayanan;
    let total_harga = req.body.total_harga;
   
    // let bukti_pembayaran = req.body.bukti_pembayaran;
    let bukti_pembayaran = req.file.filename;
    let status = req.body.status;
    let errors = false;

       if(!nama) {
    errors = true;
    res.json({pesan :'Field nama belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!alamat_cabang) {
        errors = true;
        res.json({pesan :'Field alamat cabang belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!no_hp) {
        errors = true;
        res.json({pesan :'Field nomer hp belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!status) {
        errors = true;
        res.json({pesan :'Field role belum diisi, Field harus diisi dengan lengkap'});
    }

    if (!errors) {
        let formData = {
            id_admin: id_admin,
            id_user: id_user,
            id_teknisi: id_teknisi,
            
            tanggal_bayar: tanggal_bayar,
            tanggal_pelayanan: tanggal_pelayanan,
            total_harga: total_harga,
            opsi_pembayaran: opsi_pembayaran,
            bukti_pembayaran: bukti_pembayaran,
            status: status
        };

        connection.query('UPDATE tbl_orders SET ? WHERE id_pesanan = ' + id, formData, function (err, result) {
            if (err) {
                res.send('error', err);
            } else {
                res.send('Data Berhasil Diupdate!');
            }
        });
    }
};


const deleteorder = function (req, res) {
  let id = req.params.id;

  // Step 1: Retrieve the payment proof filename from the database
  connection.query('SELECT bukti_pembayaran FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, rows) {
    if (err) {
      res.status(500).send('Error fetching order data: ' + err);
      return;
    }

    if (rows.length === 0) {
      res.status(404).send('Order not found');
      return;
    }

    let bukti_pembayaran = rows[0].bukti_pembayaran;

    // Step 2: Delete the order from the database
    connection.query('DELETE FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, result) {
      if (err) {
        res.status(500).send('Error deleting order: ' + err);
        return;
      }

      // Check if there is a payment proof file to delete
      if (bukti_pembayaran) {
        let bukti_pembayaranPath = path.join(__dirname, '../public/uploads/order', bukti_pembayaran);

        // Check if the file exists
        fs.access(bukti_pembayaranPath, fs.constants.F_OK, (err) => {
          if (err) {
            // File does not exist, respond to the client
            res.status(200).send('Order deleted successfully. No payment proof file found.');
            return;
          }

          // File exists, delete it
          fs.unlink(bukti_pembayaranPath, (err) => {
            if (err) {
              res.status(500).send('Order deleted, but error deleting payment proof file: ' + err);
              return;
            }

            res.status(200).send('Order and payment proof file deleted successfully.');
          });
        });
      } else {
        res.status(200).send('Order deleted successfully. No payment proof file found.');
      }
    });
  });
};
module.exports = {
  getAllorder,
  getorderId,
  createorder, 
  updateorder,
  deleteorder
};