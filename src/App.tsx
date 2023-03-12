import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Post} from './features/post/post'
import { FormInput } from './components/formInput';
import { User } from './features/users/users'

function App() {
  return (
    <div className="App">
      <FormInput />
      <User />
    </div>
  );
}

export default App;
