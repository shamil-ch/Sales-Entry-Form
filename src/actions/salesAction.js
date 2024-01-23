// src/actions/salesActions.js
export const addDetailRow = () => ({
    type: 'ADD_DETAIL_ROW',
  });
  
  export const removeDetailRow = (index) => ({
    type: 'REMOVE_DETAIL_ROW',
    payload: index,
  });
  
  export const updateHeaderField = (field, value) => ({
    type: 'UPDATE_HEADER_FIELD',
    payload: { field, value },
  });
  
  export const updateDetailField = (index, field, value) => ({
    type: 'UPDATE_DETAIL_FIELD',
    payload: { index, field, value },
  });

  export const clearForm = () => {
    return {
      type: 'CLEAR_FORM',
    };
  };
  