// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SalesEntryForm from './components/SalesentryForm';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <SalesEntryForm />
      </div>
    </Provider>
  );
};

export default App;
