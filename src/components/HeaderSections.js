// src/components/HeaderSection.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHeaderField } from '../actions/salesAction';

const HeaderSection = () => {
  const dispatch = useDispatch();
  const headerFields = useSelector((state) => state.sales.headerFields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateHeaderField(name, value));
  };

  return (
    <div className='header-section'>
      <label>Voucher Number:</label>
      <input type="text" name="vr_no" value={headerFields.vr_no} onChange={handleChange} className='voucher'/>

      <label>Date:</label>
      <input type="text" name="vr_date" value={headerFields.vr_date} onChange={handleChange} className='date'/>

      <label>Account Name:</label>
      <input type="text" name="ac_name" value={headerFields.ac_name} onChange={handleChange} className='acc-name'/>

      <label>Account Amount:</label>
      <input type="text" name="ac_amt" value={headerFields.ac_amt} onChange={handleChange} className='acc-amt'/>

      <label className='satus'>Status:</label>
      <select name="status" value={headerFields.status} onChange={handleChange}>
        <option value="A">Active</option>
        <option value="I">Inactive</option>
      </select>
    </div>
  );
};

export default HeaderSection;
