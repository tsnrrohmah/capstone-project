import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './Pembelian.css';

const FormPembelian = () => {
  const [paymentMode, setPaymentMode] = useState('transfer');
  const [transferImage, setTransferImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { id_katagori, price, title } = location.state || {};

  const id_user = localStorage.getItem("id_user");

  const [orderData, setOrderData] = useState({
    id_admin: '',
    id_user: parseInt(id_user),
    id_teknisi: '',
    id_katagori: parseInt(id_katagori),
    tanggal_bayar: '',
    tanggal_pelayanan: '',
    total_harga: price,
    opsi_pembayaran: paymentMode,
    status: 'diproses'
  });

  const handleModeChange = (mode) => {
    setPaymentMode(mode);
    setOrderData({
      ...orderData,
      opsi_pembayaran: mode
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setTransferImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id_admin', orderData.id_admin);
    formData.append('id_user', orderData.id_user);
    formData.append('id_teknisi', orderData.id_teknisi);
    formData.append('id_katagori', orderData.id_katagori);
    formData.append('tanggal_bayar', orderData.tanggal_bayar);
    formData.append('tanggal_pelayanan', orderData.tanggal_pelayanan);
    formData.append('total_harga', orderData.total_harga);
    formData.append('opsi_pembayaran', orderData.opsi_pembayaran);
    formData.append('status', orderData.status);
    if (transferImage) {
      formData.append('bukti_pembayaran', transferImage);
    }

    console.log('FormData yang dikirim:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:5000/order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Show the modal on successful submission
      setShowModal(true);
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
      if (error.response) {
        console.error('Data error:', error.response.data);
        console.error('Status error:', error.response.status);
        console.error('Header error:', error.response.headers);
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/catalog');
  };

  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Form Pembelian</h2>
          <h3>{title}</h3>
          <Form onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>ID User:</Form.Label>
              <Form.Control type="number" name="id_user" value={orderData.id_user} onChange={handleChange} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID Kategori:</Form.Label>
              <Form.Control type="number" name="id_katagori" value={orderData.id_katagori} onChange={handleChange} readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tanggal Bayar:</Form.Label>
              <Form.Control type="datetime-local" name="tanggal_bayar" value={orderData.tanggal_bayar} onChange={handleChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tanggal Pelayanan:</Form.Label>
              <Form.Control type="datetime-local" name="tanggal_pelayanan" value={orderData.tanggal_pelayanan} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Harga:</Form.Label>
              <Form.Control type="number" name="total_harga" value={orderData.total_harga} onChange={handleChange} required readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status:</Form.Label>
              <Form.Control type="text" name="status" value={orderData.status} onChange={handleChange} required readOnly/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Pilih Mode Pembayaran:</Form.Label>
              <Form.Check type="radio" label="Transfer" name="paymentMode" checked={paymentMode === 'transfer'} onChange={() => handleModeChange('transfer')} />
              <Form.Check type="radio" label="COD (Cash On Delivery)" name="paymentMode" checked={paymentMode === 'cod'} onChange={() => handleModeChange('cod')} />
            </Form.Group>
            {paymentMode === 'transfer' && (
              <Form.Group>
                <Form.Label>Upload Gambar Bukti Transfer:</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
              </Form.Group>
            )}
            <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: '#1D204F' }}>
              Kirim
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pembelian Anda Berhasil!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FormPembelian;
