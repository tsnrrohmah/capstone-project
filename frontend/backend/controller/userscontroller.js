var fs = require("fs");
var path = require("path");
var connection = require("../library/database");
const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust the salt rounds as needed

/**
 * INDEX users
 */
const getAllusers = function (req, res) {
  connection.query("SELECT * FROM tbl_users", function (err, rows) {
    if (err) {
      res.json({ data: "", error: err });
    } else {
      res.json({ data: rows });
    }
  });
};

const getusersId = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT * FROM tbl_users WHERE id_user = ?", [id], function (err, rows) {
    if (err) {
      res.json({ data: "", error: err });
    } else {
      res.json({ data: rows });
    }
  });
};

const createusers = function (req, res) {
  let { username, email, password, alamat, no_hp } = req.body;
  let gambar = req.file ? req.file.filename : null;
  let errors = false;

  if (!username || !email || !password || !alamat || !no_hp) {
    errors = true;
    res.json({
      pesan: "Semua field harus diisi dengan lengkap",
    });
    return;
  }

  if (!errors) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        res.json({ pesan: "Gagal mengenkripsi password" });
        return;
      }

      let formData = { username, email, password: hash, gambar, alamat, no_hp };

      connection.query("INSERT INTO tbl_users SET ?", formData, function (err, result) {
        if (err) {
          res.json({ pesan: "Data gagal disimpan" });
        } else {
          res.send("Data Berhasil Disimpan!");
        }
      });
    });
  }
};

const updateusers = function (req, res) {
  let id = req.params.id;
  let { username, email, password, alamat, no_hp } = req.body;
  let gambarBaru = req.file ? req.file.filename : null;
  let errors = false;

  if (!username || !email || !alamat || !no_hp) {
    errors = true;
    res.json({
      pesan: "Semua field harus diisi dengan lengkap",
    });
    return;
  }

  if (!errors) {
    connection.query('SELECT gambar, password FROM tbl_users WHERE id_user = ?', [id], function (err, rows) {
      if (err) {
        res.send('error', err);
        return;
      }

      let gambarLama = rows.length > 0 ? rows[0].gambar : null;
      let existingPassword = rows.length > 0 ? rows[0].password : null;

      if (gambarBaru && gambarLama) {
        let gambarPath = path.join(__dirname, '../public/uploads/users', gambarLama);
        fs.unlink(gambarPath, (err) => {
          if (err) {
            console.log('Gagal menghapus gambar lama: ', err);
          }
        });
      }

      let gambar = gambarBaru ? gambarBaru : gambarLama;

      const updateData = (hashedPassword) => {
        let formData = {
          username,
          email,
          password: hashedPassword,
          gambar,
          alamat,
          no_hp
        };

        connection.query('UPDATE tbl_users SET ? WHERE id_user = ?', [formData, id], function (err, result) {
          if (err) {
            res.send('error', err);
          } else {
            res.send('Data Berhasil Diupdate!');
          }
        });
      };

      if (password) {
        // If a new password is provided, hash it before saving
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            res.json({ pesan: "Gagal mengenkripsi password" });
            return;
          }
          console.log(`Password hashed successfully: ${hash}`); // Debugging log
          updateData(hash);
        });
      } else {
        // If no new password is provided, keep the existing password
        console.log(`Using existing password: ${existingPassword}`); // Debugging log
        updateData(existingPassword);
      }
    });
  }
};



const deleteusers = function (req, res) {
  let id = req.params.id;
  connection.query("SELECT gambar FROM tbl_users WHERE id_user = ?", [id], function (err, rows) {
    if (err) {
      res.send("error", err);
      return;
    }

    if (rows.length === 0) {
      res.send("Data tidak ditemukan");
      return;
    }

    let gambar = rows[0].gambar;
    let gambarPath = path.join(__dirname, "../public/uploads/users", gambar);

    connection.query("DELETE FROM tbl_users WHERE id_user = ?", [id], function (err, result) {
      if (err) {
        res.send("error", err);
        return;
      }

      fs.unlink(gambarPath, (err) => {
        if (err) {
          res.send("Data berhasil dihapus, tetapi gagal menghapus gambar: " + err);
          return;
        }

        res.send("Data dan gambar berhasil dihapus!");
      });
    });
  });
};

module.exports = {
  getAllusers,
  getusersId,
  createusers,
  updateusers,
  deleteusers,
};
