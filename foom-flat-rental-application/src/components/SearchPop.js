import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import Autocomplete from '@mui/material/Autocomplete';


import { Modal, Typography,Grid , TextField, Button, makeStyles } from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const countries = [
  'Turkey',
  'Germany',
  'USA',
 
  'France',
  'Netherlands',
  'China',
  'South Africa',
  
];
const cities = [
  'Ankara',
  'Berlin',
  'New York',

  'Paris',
  'Amsterdam',
  'Pekin',
  'Cape Town',
  
];

const useStyles = makeStyles((theme) => ({
    searchModal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(3),
      width: '50%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      outline: 'none',
    },
    inputField: {
      margin: theme.spacing(1, 0),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  }));
const SearchPop = ({isOpen, onClose}) => {

    const classes = useStyles();
    const [country,setCountry] = useState('');
    const [city,setCity] = useState('');
    const [inDate,setinDate] = useState(dayjs());
    const [outDate,setoutDate] = useState(dayjs());
    const [guests,setguests] = useState(1); 
    
    const handleSearch = () => {
        // Perform search logic here
        onClose(); // Close the modal after searching
      };
      const handleChange1 = (event) => {
        const {
          target: { value },
        } = event;
        setCountry(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const handleChange2 = (event) => {
        const {
          target: { value },
        } = event;
        setCity(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      return (
        <Modal
        open={isOpen}
        onClose={onClose}
        className={classes.searchModal}
      >
        <div className={classes.modalContent}>
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countries}
      sx={{ width: 300 , mb: 3}}
      renderInput={(params) => <TextField {...params} label="Country" />}
    />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cities}
      sx={{ width: 300 , mb: 5}}
      renderInput={(params) => <TextField {...params} label="City" />}
      
    />
        
          
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="In Date"
          format="DD-MM-YYYY"
          defaultValue={dayjs()}
          inDate={inDate}
          onChange={(newValue) => setinDate(newValue)}
        />
     
    </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Out Date"
          format="DD-MM-YYYY"
          defaultValue={dayjs()}
          outDate={outDate}
          onChange={(newValue) => setoutDate(newValue)}
        />
     
    </LocalizationProvider>
          </Grid>
        </Grid>
          <TextField
            className={classes.inputField}
            type="number"
            label="Guests"
            value={guests}
            onChange={(e) => setguests(e.target.value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Modal>
  );
      
}
export default SearchPop; 

