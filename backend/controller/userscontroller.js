var fs = require("fs");
var path = require("path");
var connection = require("../library/database");
/**
 * INDEX users
 */
const getAllusers = function (req, res) {
  //query
  connection.query("SELECT * FROM tbl_users", function (err, rows) {
    if (err) {
      res.send("error", err);
      res.json({
        data: "",
      });
    } else {
      //menampilkan hasil data users
      res.json({
        data: rows, // <-- tampilkan data users
      });
    }
  });
};

const getusersId = function (req, res) {
  let id = req.params.id;
  //query
  connection.query(
    "SELECT * FROM tbl_users WHERE id_user =" + id,
    function (err, rows) {
      if (err) {
        res.send("error", err);
        res.json({
          data: "",
        });
      } else {
        res.json({
          data: rows,
        });
      }
    }
  );
};

const createusers = function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let gambar = req.file.filename;
  let alamat = req.body.alamat;
  let no_hp = req.body.no_hp;
  let errors = false;

  if (!username) {
    errors = true;
    res.json({
      pesan: "Field username belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!email) {
    errors = true;
    res.json({
      pesan: "Field email belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!password) {
    errors = true;
    res.json({
      pesan: "Field password belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!alamat) {
    errors = true;
    res.json({
      pesan: "Field alamat belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!no_hp) {
    errors = true;
    res.json({
      pesan: "Field no_hp belum diisi, Field harus diisi dengan lengkap",
    });
  }

  // if no error
  if (!errors) {
    let formData = {
      username: username,
      email: email,
      password: password,
      gambar: gambar,
      alamat: alamat,
      no_hp: no_hp,
    };

    // insert query
    connection.query(
      "INSERT INTO tbl_users SET ?",
      formData,
      function (err, result) {
        //if(err) throw err
        if (err) {
          res.json({ pesan: "Data gagal disimpan" });
        } else {
          res.send("Data Berhasil Disimpan!");
        }
      }
    );
  }
};

/*
 * UPDATE kelas
 */
const updateusers = function (req, res) {
  let id = req.params.id;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let gambarBaru = req.file ? req.file.filename : null;
  let alamat = req.body.alamat;
  let no_hp = req.body.no_hp;
  let errors = false;

  if (!username) {
    errors = true;
    res.json({
      pesan: "Field username belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!email) {
    errors = true;
    res.json({
      pesan: "Field email belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!password) {
    errors = true;
    res.json({
      pesan: "Field email belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!alamat) {
    errors = true;
    res.json({
      pesan: "Field alamat belum diisi, Field harus diisi dengan lengkap",
    });
  }

  if (!no_hp) {
    errors = true;
    res.json({
      pesan: "Field no_hp belum diisi, Field harus diisi dengan lengkap",
    });
  }

  // if no error
 
    // update query

    connection.query('SELECT gambar FROM tbl_users WHERE id_user = ?', [id], function (err, rows) {
      if (err) {
          res.send('error', err);
          return;
      }

      let gambarLama = rows.length > 0 ? rows[0].gambar : null;

      if (gambarBaru && gambarLama) {
          let gambarPath = path.join(__dirname, '../public/uploads/users', gambarLama);
          fs.unlink(gambarPath, (err) => {
              if (err) {
                  console.log('Gagal menghapus gambar lama: ', err);
              }
          });
      }

      let gambar = gambarBaru ? gambarBaru : gambarLama;

      let formData = {
          username: username,
          email: email,
          password: password,
          gambar: gambar,
          alamat: alamat,
          no_hp: no_hp
      };

      connection.query('UPDATE tbl_users SET ? WHERE id_user = ?', [formData, id], function (err, result) {
          if (err) {
              res.send('error', err);
              return;
          }

          res.send('Data Berhasil Diupdate!');
      });
  });

};

const deleteusers = function (req, res) {
  let id = req.params.id;

  // Pertama, ambil username file gambar dari database
  connection.query(
    "SELECT gambar FROM tbl_users WHERE id_user = ?",
    [id],
    function (err, rows) {
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

      // Hapus data teknisi dari database
      connection.query(
        "DELETE FROM tbl_users WHERE id_user = ?",
        [id],
        function (err, result) {
          if (err) {
            res.send("error", err);
            return;
          }

          // Hapus file gambar dari sistem file
          fs.unlink(gambarPath, (err) => {
            if (err) {
              res.send(
                "Data berhasil dihapus, tetapi gagal menghapus gambar: " + err
              );
              return;
            }

            res.send("Data dan gambar berhasil dihapus!");
          });
        }
      );
    }
  );
};

module.exports = {
  getAllusers,
  getusersId,
  createusers,
  updateusers,
  deleteusers,
};

// var connection = require('../library/database');
// /**
//  * INDEX users
//  */
// const getAllusers = function (req, res) {
//  //query
//  connection.query('SELECT * FROM tbl_users', function (err, rows) {
//  if (err) {
//  res.send('error', err);
//  res.json({
//  data: ''
//  });
//  } else {
//  //menampilkan hasil data users
//  res.json( {
//  data: rows // <-- tampilkan data users
//  });
//  }
//  });
// };

// const getusersId = function (req, res) {
//     let id = req.params.id;
//     //query
//     connection.query('SELECT * FROM tbl_users WHERE id_user ='+ id, function (err, rows) {
//     if (err) {
//     res.send('error', err);
//     res.json({
//     data: ''
//     });
//     } else {
//     res.json( {
//     data: rows
//     });
//     }
//     });
//    };

//   const createusers = function (req, res) {

//     let nama = req.body.nama;
//     let email = req.body.email;
//     let password = req.body.password;
//     let gambar = req.body.gambar;
//     let alamat = req.body.alamat;
//     let no_hp = req.body.no_hp;
//     let errors = false;

//     if(!nama) {
//     errors = true;
//     res.json({pesan :'Field nama belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!email) {
//     errors = true;
//     res.json({pesan :'Field email belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!password) {
//         errors = true;
//         res.json({pesan :'Field password belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!alamat) {
//         errors = true;
//         res.json({pesan :'Field alamat belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!no_hp) {
//         errors = true;
//         res.json({pesan :'Field no_hp belum diisi, Field harus diisi dengan lengkap'});
//     }

//     // if no error
//     if(!errors) {
//     let formData = {
//     nama: nama,
//     email: email,
//     password: password,
//     gambar: gambar,
//     alamat: alamat,
//     no_hp: no_hp
//     }

//     // insert query
//     connection.query('INSERT INTO tbl_users SET ?', formData, function(err, result) {
//     //if(err) throw err
//     if (err) {
//     res.json({pesan :'Data gagal disimpan'});
//     } else {
//     res.send('Data Berhasil Disimpan!');
//     }
//     })

//    }
//    }

// /*
//  * UPDATE kelas
//  */
// const updateusers = function(req, res) {
//     let id = req.params.id;
//     let nama = req.body.nama;
//     let email = req.body.email;
//     let password = req.body.password;
//     let gambar = req.body.gambar;
//     let alamat = req.body.alamat;
//     let no_hp = req.body.no_hp;

//     let errors = false;

//     if(!nama) {
//         errors = true;
//         res.json({pesan :'Field nama belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!email) {
//         errors = true;
//         res.json({pesan :'Field email belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!password) {
//             errors = true;
//             res.json({pesan :'Field email belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!password) {
//             errors = true;
//             res.json({pesan :'Field status belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!alamat) {
//             errors = true;
//             res.json({pesan :'Field alamat belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!no_hp) {
//             errors = true;
//             res.json({pesan :'Field no_hp belum diisi, Field harus diisi dengan lengkap'});
//         }

//     // if no error
//     if( !errors ) {
//     let formData = {
//         nama: nama,
//         email: email,
//         password: password,
//         gambar: gambar,
//         alamat: alamat,
//         no_hp: no_hp
//     }
//     // update query
//     connection.query('UPDATE tbl_users SET ? WHERE id_user = ' + id, formData, function(err, result) {
//     //if(err) throw err
//     if (err) {
//     res.send('error', err);
//     res.json({
//     id_users: req.params.id_users,
//     nama: formData.nama,
//     email: formData.email,
//     password: formData.password,
//     gambar: formData.gambar,
//     alamat: formData.alamat,
//     no_hp: formData.no_hp
//     })
//     } else {
//     res.send('Data Berhasil Diupdate!');
//     }
//     })
//     }
//    }

//    const deleteusers = function(req, res) {
//     let id = req.params.id;

//     connection.query('DELETE FROM tbl_users WHERE id_user = ' + id, function(err, result) {
//     if (err) {
//     res.send('error', err)
//     } else {
//     res.send('Data Berhasil Dihapus!')
//     }
//     })
//    }

//    module.exports = {
//     getAllusers,
//     getusersId,
//     createusers,
//     updateusers,
//     deleteusers
//    }
