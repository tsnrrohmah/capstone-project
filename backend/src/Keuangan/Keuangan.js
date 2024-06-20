import React from 'react';
import { StyledKeuangan } from './StyledKeuangan';

const Keuangan = () => {
  return (
    <StyledKeuangan>
      <h1>Keuangan</h1>
      <button>Tambah Transaksi Baru</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Deskripsi</th>
            <th>Jumlah</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder data */}
          <tr>
            <td>1</td>
            <td>Transaksi 1</td>
            <td>100000</td>
            <td>
              <button>Edit</button>
              <button>Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledKeuangan>
  );
};

export default Keuangan;
