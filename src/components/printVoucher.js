// src/components/PrintableVoucher.js
import React from 'react';
import styles from './voucher.module.css'

const PrintableVoucher = ({ headerFields, detailFields, onCancel }) => {
  return (
    <div className={styles.printable}>
      <h1>Voucher</h1>

      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <strong>Voucher Number:</strong> {headerFields.vr_no}
        </div>
        <div>
          <strong>Date:</strong> {headerFields.vr_date}
        </div>
        <div>
          <strong>Account Name:</strong> {headerFields.ac_name}
        </div>
        {/* Add more header fields as needed */}
      </div>

      {/* Detail Section */}
      <div className={styles.detail}>
        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {detailFields.map((detail) => (
              <tr key={detail.sr_no}>
                <td>{detail.item_code}</td>
                <td>{detail.item_name}</td>
                <td>{detail.description}</td>
                <td>{detail.qty}</td>
                <td>{detail.rate}</td>
                <td>{detail.qty * detail.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancel Print Button */}
      <button type="button" onClick={onCancel}>
        Cancel Print
      </button>
    </div>
  );
};

export default PrintableVoucher;
