import './App.css';
import { Autocomplete, Button, TextField, Box, Avatar } from '@mui/material';
import { Person, Circle } from '@mui/icons-material'
import { useEffect, useState } from 'react';

import logo from './assets/logo.png';
import { crm_data } from './data';

function getFirstLetters(str) {
  const firstLetters = str
    .split(' ')
    .map(word => word[0])
    .join('');

  return firstLetters;
}

const addCSM = (st, ob) => {
  localStorage.setItem("allCSM", [...localStorage.getItem("allCSM"), JSON.stringify(ob)]);
  st(JSON.parse(localStorage.getItem("allCSM")));
}

function App() {
  const [allCSM, setAllCSM] = useState([]);
  const [csmName, setCSMName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("allCSM") === null) {
      localStorage.setItem("allCSM", []);
    }
  });

  return (
    <div className="App tw-flex tw-flex-col tw-px-10 md:tw-px-20 lg:tw-px-40 tw-gap-4">
      <div className='tw-flex tw-flex-row'>
        <img src={logo} ></img>
        <div className='tw-flex tw-flex-col'>
          <h4 className='tw-text-3xl tw-font-semibold tw-tracking-wider'>YOUR SPOTTABL TEAM</h4>
          <div className='tw-font-semibold tw-text-lg tw-tracking-wide'>Spottabl supports you all throughout</div>
        </div>
      </div>
      <h3 className="tw-text-2xl tw-font-bold">Customer Success Managers</h3>
      <div className='tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-gap-4'>
        <Autocomplete
          className="tw-grow tw-h-full"
          disablePortal
          id="combo-box-demo"
          options={crm_data}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <div className='tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-2'>
                <div className='tw-flex tw-items-center tw-justify-center'>
                  <Avatar sx={{ width: 48, height: 48 }}>{getFirstLetters(option.name).substring(0, 2)}</Avatar>
                </div>
                <div className='crmdata-obj tw-flex tw-flex-col tw-justify-center tw-px-8'>
                  <h5 className='tw-text-lg tw-font-bold'>{option.name}</h5>
                  <div className='tw-flex tw-flex-row tw-text-md'>
                    <Person></Person>
                    <div>{option.role.map((r, i) => (i===option.role.length-1) ? r : `${r} - `)}</div>
                    {(option.email.length) ? <div className='tw-px-4'><Circle sx={{width: 6, height: 6}}></Circle> {option.email}</div> : null }
                  </div>
                </div>
              </div>
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Add by Name or Email" />}
        />
        <div className='tw-flex tw-h-12 justify-center md:tw-h-auto'>
          <Button variant="contained" className="md:tw-rounded-l-none tw-h-full md:tw-h-auto">Add CSM</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
