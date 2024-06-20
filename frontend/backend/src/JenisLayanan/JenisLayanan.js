import React from 'react';
import { StyledJenisLayanan } from './StyledJenisLayanan';

const JenisLayanan = () => {
  return (
    <StyledJenisLayanan>
      <h1>Jenis Layanan</h1>
      <button>Tambah Layanan Baru</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Layanan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder data */}
          <tr>
            <td>1</td>
            <td>Layanan 1</td>
            <td>
              <button>Edit</button>
              <button>Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledJenisLayanan>
  );
};

export default JenisLayanan;
