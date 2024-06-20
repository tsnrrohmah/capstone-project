var fs = require('fs');
var path = require('path');
var connection = require('../library/database');
const bcrypt = require('bcryptjs');


const getAlladmin = function (req, res) {
  connection.query('SELECT * FROM tbl_admins', function (err, rows) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).json({ data: rows });
  });
};

const getadminId = function (req, res) {
  let id = req.params.id;
  connection.query('SELECT * FROM tbl_admins WHERE id_admin =' + id, function (err, rows) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.status(200).json({ data: rows });
  });
};

const createadmin = function (req, res) {
  let { username, email, password, alamat, no_hp, role } = req.body;
  let gambar = req.file ? req.file.filename : null;
  let errors = false;

  if (!username || !email || !password || !alamat || !no_hp || !role) {
    errors = true;
    return res.status(400).json({ pesan: 'Field harus diisi dengan lengkap' });
  }

  if (!errors) {
    let formData = { username, email, password, gambar, alamat, no_hp, role };
    connection.query('INSERT INTO tbl_admins SET ?', formData, function (err) {
      if (err) {
        return res.status(500).json({ pesan: 'Data gagal disimpan' });
      }
      res.status(201).send('Data Berhasil Disimpan!');
    });
  }
};

const updateadmin = function (req, res) {
  let id = req.params.id;
  let { username, email, password, alamat, no_hp, role } = req.body;
  let gambar = req.file ? req.file.filename : null;

  if (!username || !email || !alamat || !no_hp || !role) {
    return res.status(400).json({ pesan: 'Field harus diisi dengan lengkap' });
  }

  let formData = { username, email, alamat, no_hp, role };
  if (password) {
    bcrypt.hash(password, 10, function (err, hashedPassword) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      formData.password = hashedPassword;
      finalizeUpdate(formData);
    });
  } else {
    finalizeUpdate(formData);
  }

  function finalizeUpdate(formData) {
    if (gambar) {
      formData.gambar = gambar;
    }

    connection.query('SELECT gambar FROM tbl_admins WHERE id_admin = ?', [id], function (err, rows) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      if (rows.length === 0) {
        return res.status(404).send('Data tidak ditemukan');
      }
      let oldGambar = rows[0].gambar;

      connection.query('UPDATE tbl_admins SET ? WHERE id_admin = ?', [formData, id], function (err) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }

        if (gambar && oldGambar) {
          let oldGambarPath = path.join(__dirname, '../public/uploads/admin', oldGambar);
          fs.unlink(oldGambarPath, (err) => {
            if (err && err.code !== 'ENOENT') {
              return res.status(500).send('Data berhasil diupdate, tetapi gagal menghapus gambar lama: ' + err.message);
            }
            res.status(200).send('Admin berhasil diupdate!');
          });
        } else {
          res.status(200).send('Admin berhasil diupdate!');
        }
      });
    });
  }
};


const deleteadmin = function(req, res) {
  let id = req.params.id;

  connection.query('DELETE FROM tbl_orders WHERE id_admin = ?', [id], function(err, result) {
    if (err) {
      console.error('Error deleting related orders:', err);
      return res.status(500).send({ error: 'Error deleting related orders' });
    }

    connection.query('SELECT gambar FROM tbl_admins WHERE id_admin = ?', [id], function (err, rows) {
      if (err) {
        console.error('Error fetching admin:', err);
        return res.status(500).send({ error: 'Error fetching admin' });
      }
      
      if (rows.length === 0) {
        return res.status(404).send('Data tidak ditemukan');
      }

      let gambar = rows[0].gambar;

      connection.query('DELETE FROM tbl_admins WHERE id_admin = ?', [id], function (err, result) {
        if (err) {
          console.error('Error deleting admin:', err);
          return res.status(500).send({ error: 'Error deleting admin' });
        }

        if (gambar) {
          let gambarPath = path.join(__dirname, '../public/uploads/admin', gambar);

          fs.unlink(gambarPath, (err) => {
            if (err && err.code !== 'ENOENT') {
              console.error('Error deleting image file:', err);
              return res.status(500).send('Data berhasil dihapus, tetapi gagal menghapus gambar: ' + err.message);
            }
            
            res.status(200).send('Data dan gambar berhasil dihapus!');
          });
        } else {
          res.status(200).send('Data berhasil dihapus, tidak ada gambar yang dihapus');
        }
      });
    });
  });
};

module.exports = {
  getAlladmin,
  getadminId,
  createadmin,
  updateadmin,
  deleteadmin
};


