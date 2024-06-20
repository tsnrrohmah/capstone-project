import React from 'react';
import user from "../assets/ServiceImage.jpg"

function UserProfile() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 position-relative">
            
            {/* Kotak profil */}
            <div className="card bg-primary text-white rounded text-center p-5 pt-2 position-absolute top-40 start-50 translate-middle" style={{ marginTop: '20px', width: '800px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
              <div className="card-title-container" style={{ height: '300px' }}>
                <h1 className="card-title" style={{ marginTop: '70px' }}>Profile</h1>
              </div>
            </div>

            {/* Kotak informasi admin */}
            <div className="card bg-white text-center p-4 mb-3" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>

              <div className="avatar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px', margin: 'auto' }}>
                <img src={user} alt="User Avatar" className="rounded-circle" style={{ width: '80%', height: '80%', objectFit: 'cover', margin: 0 }} />
              </div>
            
              <h3 style={{ display: 'inline-block', backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: '10px', padding: '10px' }}>
                Halo, Selamat Siang
              </h3>
              
              <p>Admin_1</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary me-1 d-inline-block">Ubah Password</button>
                <button className="btn btn-primary d-inline-block">Logout</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;





