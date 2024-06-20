import React from 'react';
import { StyledDaftarTeknisi } from './StyledDaftarTeknisi';

const DaftarTeknisi = () => {
  return (
    <StyledDaftarTeknisi>
      <h1>Daftar Teknisi</h1>
      <button>Tambah Teknisi Baru</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Teknisi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder data */}
          <tr>
            <td>1</td>
            <td>Teknisi 1</td>
            <td>
              <button>Edit</button>
              <button>Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledDaftarTeknisi>
  );
};

export default DaftarTeknisi;
