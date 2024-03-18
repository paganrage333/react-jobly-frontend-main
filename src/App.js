import { BrowserRouter } from 'react-router-dom';
import './App.css';
import JoblyApi from "./helpers/JoblyApi"
import { useEffect, useState } from 'react';
import UserProvider from './components/UserProvider/UserProvider.js';


function App() {
  

  return (
    <div className="App">
        <BrowserRouter>
          <UserProvider />
        </BrowserRouter>
    </div>
  );
}

export default App;
