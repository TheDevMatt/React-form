import React from 'react';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import Form from '../Form/Form';
import '../../styles/App.css';

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Form/>
      </LocalizationProvider>
    </div>
  );
}

export default App;
