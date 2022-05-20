import './App.css';
import { Autocomplete, Button, TextField, Box, Avatar } from '@mui/material';
import { Person, Circle } from '@mui/icons-material'
import { useEffect, useState } from 'react';

import logo from './assets/logo.jpg';
import { crm_data } from './data';
import AllCSM from './Components/AllCSM';

function getFirstLetters(str) {
  const firstLetters = str
    .split(' ')
    .map(word => word[0])
    .join('');

  return firstLetters;
}

const addCSM = (st, ob) => {
  ob.forEach(obt => localStorage.setItem("allCSM", JSON.stringify([...JSON.parse(localStorage.getItem("allCSM")), obt])))
  st(JSON.parse(localStorage.getItem("allCSM")));
}

function App() {
  if(!localStorage.getItem('allCSM')) localStorage.setItem('allCSM', "[]");

  const [allCSM, setAllCSM] = useState(JSON.parse(localStorage.getItem('allCSM')));
  const [csmName, setCSMName] = useState([]);

  return (
    <div className="App tw-flex tw-flex-col tw-justify-center tw-px-10 md:tw-px-20 lg:tw-px-40 tw-gap-12">
      <div className='tw-flex tw-flex-row tw-gap-4'>
        <img style={{width: "70px", height: "70px"}} src={logo} ></img>
        <div className='tw-flex tw-flex-col'>
          <h4 className='tw-text-3xl tw-font-semibold tw-tracking-wider'>YOUR SPOTTABL TEAM</h4>
          <div className='tw-font-semibold tw-text-lg tw-tracking-wide'>Spottabl supports you all throughout</div>
        </div>
      </div>
      <div className='tw-flex tw-flex-col tw-gap-6'>
        <h3 className="tw-text-2xl tw-font-bold">Customer Success Managers</h3>
        <div className='tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-gap-4'>
          <Autocomplete
            className="tw-grow tw-h-full"
            disablePortal
            multiple
            id="combo-box-demo"
            options={crm_data}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setCSMName(value)}
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
                      <div>{option.role.map((r, i) => (i === option.role.length - 1) ? r : `${r} - `)}</div>
                      {(option.email.length) ? <div className='tw-px-4'><Circle sx={{ width: 6, height: 6 }}></Circle> {option.email}</div> : null}
                    </div>
                  </div>
                </div>
              </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Add by Name or Email" />}
          />
          <div className='tw-flex tw-h-12 justify-center md:tw-h-auto'>
            <Button onClick={() => addCSM(setAllCSM, csmName)} variant="contained" className="md:tw-rounded-l-none tw-h-full md:tw-h-auto">Add CSM</Button>
          </div>
        </div>
      </div>
      <AllCSM csms={allCSM} setCSM={setAllCSM}/>
    </div>
  );
}

export default App;
