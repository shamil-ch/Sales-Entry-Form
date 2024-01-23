// src/components/DetailsSection.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetailField, addDetailRow, removeDetailRow } from '../actions/salesAction';

const DetailsSection = () => {
  const dispatch = useDispatch();
  const detailFields = useSelector((state) => state.sales.detailFields);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount whenever detailFields change
    const calculateTotalAmount = () => {
        const total = detailFields.reduce((acc, detail) => {
          return acc + (detail.qty && detail.rate ? detail.qty * detail.rate : 0);
        }, 0);
    
        setTotalAmount(total);
      };
      calculateTotalAmount();

  }, [detailFields]);

  

  const handleUpdateField = (index, field, value) => {
    dispatch(updateDetailField(index, field, value));
  };

  const handleAddRow = () => {
    dispatch(addDetailRow());
  };

  const handleRemoveRow = (index) => {
    dispatch(removeDetailRow(index));
  };

  return (
    <div className='details-section'>
      {/* Table Header */}
      <div className="table-header">
        <div>Item Code</div>
        <div>Item Name</div>
        <div>Description</div>
        <div>Quantity</div>
        <div>Rate</div>
        <div>Total Amount</div> {/* New column for Total Amount */}
      </div>

      {/* Table Rows */}
      {detailFields.map((detail, index) => (
        <div key={index} className="table-row">
          <div>
            <input
              type="text"
              value={detail.item_code}
              onChange={(e) => handleUpdateField(index, 'item_code', e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={detail.item_name}
              onChange={(e) => handleUpdateField(index, 'item_name', e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={detail.description}
              onChange={(e) => handleUpdateField(index, 'description', e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              value={detail.qty}
              onChange={(e) => handleUpdateField(index, 'qty', e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              value={detail.rate}
              onChange={(e) => handleUpdateField(index, 'rate', e.target.value)}
            />
          </div>
          <div className='total-amount'>
            <span>{(detail.qty && detail.rate) ? (detail.qty * detail.rate) : 0} </span>
            </div> {/* Auto-calculate Total Amount */}
          <div className="remove-button">
            <button type="button" onClick={() => handleRemoveRow(index)}>
              Remove
            </button>
          </div>
        </div>
      ))}

       {/* Total Amount */}
       <div className="total-cost">
        <span>Total Amount:    {totalAmount}</span>
      </div>

      {/* Add Row Button */}
      <button type="button" onClick={handleAddRow} className='btn Row'>
        Add Row
      </button>
    </div>
  );
};

export default DetailsSection;
