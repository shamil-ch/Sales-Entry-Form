// src/reducers/salesReducer.js
const initialState = {
  headerFields: {
    vr_no: null,
    vr_date: '',
    ac_name: '',
    ac_amt: null,
    status: 'A',
  },
  detailFields: [
    {
      vr_no: null,
      sr_no: 1,
      item_code: '',
      item_name: '',
      description: '',
      qty: null,
      rate: null,
    },
  ],
};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DETAIL_ROW':
      return {
        ...state,
        detailFields: [
          ...state.detailFields,
          {
            vr_no: null,
            sr_no: state.detailFields.length + 1,
            item_code: '',
            item_name: '',
            description: '',
            qty: null,
            rate: null,
          },
        ],
      };
    case 'REMOVE_DETAIL_ROW':
      return {
        ...state,
        detailFields: state.detailFields.filter((_, index) => index !== action.payload),
      };
    case 'UPDATE_HEADER_FIELD':
      return {
        ...state,
        headerFields: {
          ...state.headerFields,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'UPDATE_DETAIL_FIELD':
      return {
        ...state,
        detailFields: state.detailFields.map((detail, index) =>
          index === action.payload.index
            ? {
                ...detail,
                [action.payload.field]: action.payload.value,
              }
            : detail
        ),
      };
    case 'CLEAR_FORM':
      return initialState; // Reset state to initial values
    default:
      return state;
  }
};

export default salesReducer;
