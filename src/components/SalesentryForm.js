// src/components/SalesEntryForm.js
import React, { useState } from 'react';
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import HeaderSection from './HeaderSections';
import DetailSection from './DetailsSection';
import axios from 'axios';
import { addDetailRow, removeDetailRow, updateHeaderField, updateDetailField, clearForm } from '../actions/salesAction';
import PrintableVoucher from './printVoucher';

const SalesEntryForm = () => {
  const dispatch = useDispatch();
  const { headerFields, detailFields } = useSelector((state) => state.sales);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);


  const handleSubmit = async () => {
    try {
      setError(null);
      setSuccess(null);
      setIsLoading(true);

      // Validate input data before making the API call
      if (!validateData()) {
        setError('Please fill in all required fields and ensure numeric fields are valid.');
        return;
      }

      const postData = {
        header_table: {
          vr_no: headerFields.vr_no,
          vr_date: headerFields.vr_date,
          ac_name: headerFields.ac_name,
          ac_amt: headerFields.ac_amt,
          status: headerFields.status,
        },
        detail_table: detailFields.map((detail) => ({
          vr_no: headerFields.vr_no,
          sr_no: detail.sr_no,
          item_code: detail.item_code,
          item_name: detail.item_name,
          description: detail.description,
          qty: detail.qty,
          rate: detail.rate,
        })),
      };

      console.log('Submitting data:', postData);

      const response = await axios.post('http://5.189.180.8:8010/header/multiple', postData);

      // Handle the response
      console.log('API response:', response.data);
      setSuccess('Data submitted successfully!');

      dispatch(clearForm()); // Clear form state

    } catch (error) {
      console.error('Error while making API call:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const validateData = () => {
    if (!headerFields.vr_no || !headerFields.vr_date || !headerFields.ac_name || !headerFields.ac_amt) {
      return false;
    }

    for (const detail of detailFields) {
      if (!detail.item_code || !detail.item_name || !detail.qty || !detail.rate) {
        return false;
      }

      if (isNaN(detail.qty) || isNaN(detail.rate)) {
        return false;
      }
    }

    return true;
  };

  const handleAddDetailRow = () => {
    dispatch(addDetailRow());
  };

  const handleRemoveDetailRow = (index) => {
    dispatch(removeDetailRow(index));
  };

  const handleUpdateHeaderField = (field, value) => {
    dispatch(updateHeaderField(field, value));
  };

  const handleUpdateDetailField = (index, field, value) => {
    dispatch(updateDetailField(index, field, value));
  };

  const handleRefreshForm = () => {
    // Clear the form state
    dispatch(clearForm());
    setSuccess(null);
    setError(null);
    setIsPrinting(null);
  };

  const handlePrint = () => {
    setIsPrinting(true);
  };

  const handlePrintCancel = () => {
    setIsPrinting(false);
  };

  return (
    <div className='salesform'>
      {/* HEADER SECTION */}
      <HeaderSection
        headerFields={headerFields}
        onUpdateField={handleUpdateHeaderField}
      />

      {/* DETAIL SECTION */}
      <DetailSection
        detailFields={detailFields}
        onUpdateField={handleUpdateDetailField}
        onAddRow={handleAddDetailRow}
        onRemoveRow={handleRemoveDetailRow}
      />

      {/* ERROR DISPLAY */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* SUCCESS DISPLAY */}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      {/* SUBMIT BUTTON */}
      <button type="button" onClick={handleSubmit} disabled={isLoading} className='btn submit'>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>

       {/* REFRESH BUTTON */}
       <button type="button" onClick={handleRefreshForm} className='refresh btn'>
        New
      </button>

      {/* PRINT BUTTON */}
      <button type="button" onClick={handlePrint} className='print btn'>
        Print
      </button>

      {/* CONDITIONALLY RENDER PRINTABLE COMPONENT */}
      {isPrinting && (
        <PrintableVoucher
          headerFields={headerFields}
          detailFields={detailFields}
          onCancel={handlePrintCancel}
        />
      )}
    </div>
  );
};

export default SalesEntryForm;
