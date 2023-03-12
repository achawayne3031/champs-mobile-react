import React from 'react';
import './App.css';
import { FormInput } from './components/formInput';
import { User } from './features/users/users'
import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <div className="App">
      <FormInput />
      <User />
      <ToastContainer />
    </div>
  );
}

export default App;
