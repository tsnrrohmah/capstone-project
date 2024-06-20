var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX teknisi
 */
const getAllteknisi = function (req, res) {
    connection.query('SELECT * FROM tbl_technicians', function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getteknisiId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM tbl_technicians WHERE id_teknisi = ' + id, function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createteknisi = function (req, res) {
    let nama = req.body.nama;
    let alamat_cabang = req.body.alamat_cabang;
    let no_hp = req.body.no_hp;
    let gambar = req.file ? req.file.filename : null;
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
            nama: nama,
            alamat_cabang: alamat_cabang,
            no_hp: no_hp,
            gambar: gambar,
            status: status
        };

        connection.query('INSERT INTO tbl_technicians SET ?', formData, function (err, result) {
            if (err) {
                res.json({ pesan: 'Data gagal disimpan' });
            } else {
                res.send('Data Berhasil Disimpan!');
            }
        });
    }
};

const updateteknisi = function (req, res) {
    let id = req.params.id;
    let nama = req.body.nama;
    let alamat_cabang = req.body.alamat_cabang;
    let no_hp = req.body.no_hp;
    let gambarBaru = req.file ? req.file.filename : null;
    let status = req.body.status;
    let errors = false;

    if (!nama) {
        errors = true;
        res.json({ pesan: 'Field nama belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!alamat_cabang) {
        errors = true;
        res.json({ pesan: 'Field alamat cabang belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!no_hp) {
        errors = true;
        res.json({ pesan: 'Field nomer hp belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    if (!status) {
        errors = true;
        res.json({ pesan: 'Field role belum diisi, Field harus diisi dengan lengkap' });
        return;
    }

    connection.query('SELECT gambar FROM tbl_technicians WHERE id_teknisi = ?', [id], function (err, rows) {
        if (err) {
            res.send('error', err);
            return;
        }

        let gambarLama = rows.length > 0 ? rows[0].gambar : null;

        if (gambarBaru && gambarLama) {
            let gambarPath = path.join(__dirname, '../public/uploads/technician', gambarLama);
            fs.unlink(gambarPath, (err) => {
                if (err) {
                    console.log('Gagal menghapus gambar lama: ', err);
                }
            });
        }

        let gambar = gambarBaru ? gambarBaru : gambarLama;

        let formData = {
            nama: nama,
            alamat_cabang: alamat_cabang,
            no_hp: no_hp,
            gambar: gambar,
            status: status
        };

        connection.query('UPDATE tbl_technicians SET ? WHERE id_teknisi = ?', [formData, id], function (err, result) {
            if (err) {
                res.send('error', err);
                return;
            }

            res.send('Data Berhasil Diupdate!');
        });
    });
};

const deleteteknisi = function (req, res) {
    let id = req.params.id;

    // Pertama, ambil nama file gambar dari database
    connection.query('SELECT gambar FROM tbl_technicians WHERE id_teknisi = ?', [id], function (err, rows) {
        if (err) {
            res.send('error', err);
            return;
        }

        if (rows.length === 0) {
            res.send('Data tidak ditemukan');
            return;
        }

        let gambar = rows[0].gambar;

        // Jika tidak ada gambar terkait atau gambarnya null, lanjutkan dengan penghapusan data tanpa menghapus gambar
        if (!gambar) {
            connection.query('DELETE FROM tbl_technicians WHERE id_teknisi = ?', [id], function (err, result) {
                if (err) {
                    res.send('error', err);
                    return;
                }

                res.send('Data berhasil dihapus!');
            });
        } else {
            let gambarPath = path.join(__dirname, '../public/uploads/technician', gambar);

            // Hapus data teknisi dari database
            connection.query('DELETE FROM tbl_technicians WHERE id_teknisi = ?', [id], function (err, result) {
                if (err) {
                    res.send('error', err);
                    return;
                }

                // Hapus file gambar dari sistem file
                fs.unlink(gambarPath, (err) => {
                    if (err) {
                        res.send('Data berhasil dihapus, tetapi gagal menghapus gambar: ' + err);
                        return;
                    }

                    res.send('Data dan gambar berhasil dihapus!');
                });
            });
        }
    });
};




// const deleteteknisi = function (req, res) {
//   let id = req.params.id;

//   // Pertama, ambil nama file gambar dari database
//   connection.query('SELECT gambar FROM tbl_technicians WHERE id_teknisi = ?', [id], function (err, rows) {
//       if (err) {
//           res.send('error', err);
//           return;
//       }

//       if (rows.length === 0) {
//           res.send('Data tidak ditemukan');
//           return;
//       }

//       let gambar = rows[0].gambar;
//       let gambarPath = path.join(__dirname, '../public/uploads/technician', gambar);

//       // Hapus data teknisi dari database
//       connection.query('DELETE FROM tbl_technicians WHERE id_teknisi = ?', [id], function (err, result) {
//           if (err) {
//               res.send('error', err);
//               return;
//           }

//           // Hapus file gambar dari sistem file
//           fs.unlink(gambarPath, (err) => {
//               if (err) {
//                   res.send('Data berhasil dihapus, tetapi gagal menghapus gambar: ' + err);
//                   return;
//               }

//               res.send('Data dan gambar berhasil dihapus!');
//           });
//       });
//   });
// };

module.exports = {
  getAllteknisi,
  getteknisiId,
  createteknisi,
  updateteknisi,
  deleteteknisi
};
































// var connection = require('../library/database');
// /**
//  * INDEX teknisi
//  */
// const getAllteknisi = function (req, res) {
//  //query
//  connection.query('SELECT * FROM tbl_technicians', function (err, rows) {
//  if (err) {
//  res.send('error', err);
//  res.json({
//  data: ''
//  });
//  } else {
//  //menampilkan hasil data teknisi
//  res.json( {
//  data: rows // <-- tampilkan data teknisi
//  });
//  }
//  });
// };

// const getteknisiId = function (req, res) {
//     let id = req.params.id;
//     //query
//     connection.query('SELECT * FROM tbl_technicians WHERE id_teknisi ='+ id, function (err, rows) {
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
 

//   const createteknisi = function (req, res) {

//     let nama = req.body.nama;
//     let alamat_cabang = req.body.alamat_cabang;
//     let no_hp =  req.body.no_hp;
//     let gambar = req.body.gambar;
//     let status = req.body.status;
//     let errors = false;

//     if(!nama) {
//     errors = true;
//     res.json({pesan :'Field nama belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!alamat_cabang) {
//         errors = true;
//         res.json({pesan :'Field alamat cabang belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!no_hp) {
//         errors = true;
//         res.json({pesan :'Field nomer hp belum diisi, Field harus diisi dengan lengkap'});
//     }

//     if(!status) {
//         errors = true;
//         res.json({pesan :'Field role belum diisi, Field harus diisi dengan lengkap'});
//     }

//     // if no error
//     if(!errors) {
//     let formData = {
//     nama: nama,
//     alamat_cabang: alamat_cabang,
//     no_hp: no_hp,
//     gambar: gambar,
//     status: status
//     }
   
//     // insert query
//     connection.query('INSERT INTO tbl_technicians SET ?', formData, function(err, result) {
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
// const updateteknisi = function(req, res) {
//     let id = req.params.id;
//     let nama = req.body.nama;
//     let alamat_cabang = req.body.alamat_cabang;
//     let no_hp =  req.body.no_hp;
//     let gambar = req.body.gambar;
//     let status = req.body.status;
//     let errors = false;
    
//     if(!nama) {
//         errors = true;
//         res.json({pesan :'Field nama belum diisi, Field harus diisi dengan lengkap'});
//         }
        
//         if(!alamat_cabang) {
//             errors = true;
//             res.json({pesan :'Field alamat belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!no_hp) {
//             errors = true;
//             res.json({pesan :'Field nomer hp belum diisi, Field harus diisi dengan lengkap'});
//         }

//         if(!status) {
//             errors = true;
//             res.json({pesan :'Field role belum diisi, Field harus diisi dengan lengkap'});
//         }
    
//     // if no error
//     if( !errors ) {
//     let formData = {
//         nama: nama,
//         alamat_cabang: alamat_cabang,
//         no_hp: no_hp,
//         gambar: gambar,
//         status: status
//     }
//     // update query
//     connection.query('UPDATE tbl_technicians SET ? WHERE id_teknisi = ' + id, formData, function(err, result) {
//     //if(err) throw err
//     if (err) {
//     res.send('error', err);
//     res.json({
//     id_teknisi: req.params.id_teknisi,
//     nama: formData.nama,
//     alamat_cabang: formData.alamat_cabang,
//     no_hp: formData.no_hp,
//     gambar: formData.gambar,
//     status: formData.status,
//     })
//     } else {
//     res.send('Data Berhasil Diupdate!');
//     }
//     })
//     }
//    }

//    const deleteteknisi = function(req, res) {
//     let id = req.params.id;
   
//     connection.query('DELETE FROM tbl_technicians WHERE id_teknisi = ' + id, function(err, result) {
//     if (err) {
//     res.send('error', err)
//     } else {
//     res.send('Data Berhasil Dihapus!')
//     }
//     })
//    }





//    module.exports = {
//     getAllteknisi,
//     getteknisiId,
//     createteknisi,
//     updateteknisi,
//     deleteteknisi
//    }

