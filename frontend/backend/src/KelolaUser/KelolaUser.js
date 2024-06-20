import React from 'react';
import { StyledKelolaUser } from './StyledKelolaUser';

const KelolaUser = () => {
  return (
    <StyledKelolaUser>
      <h1>Kelola User</h1>
      <button>Tambah User Baru</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama User</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder data */}
          <tr>
            <td>1</td>
            <td>User 1</td>
            <td>
              <button>Edit</button>
              <button>Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </StyledKelolaUser>
  );
};

export default KelolaUser;
