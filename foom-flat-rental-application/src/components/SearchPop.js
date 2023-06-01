import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
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
  const SearchPop = ({ filter, onFilterChange, isOpen, onClose }) => {
    const classes = useStyles();
    const [locations, setLocations] = useState([]);
    const [tempFilter, setTempFilter] = useState(filter);
    const countriesMap = {};
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/locations'); // Replace with your actual API endpoint
          setLocations(response.data);
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
  
      if (isOpen) {
        fetchData();
      }
    }, [isOpen]);
  
    locations.forEach((location) => {
      const country1 = location.country;
      const city2 = location.city;
      if (country1 && city2) {
        if (!countriesMap.hasOwnProperty(country1)) {
          countriesMap[country1] = [];
        }
        countriesMap[country1].push(city2);
      }
    });
  
    const countries = Object.keys(countriesMap);
  
    const handleSearch = () => {
      // Perform search logic here
      onFilterChange(tempFilter);
      onClose(); // Close the modal after searching
    };
  
    const handleCountryChange = (event, value) => {
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        country: value
      }));
    };
  
    const handleCityChange = (event, value) => {
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        city: value
      }));
    };
  
    const handleInDateChange = (date) => {
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        inDate: date
      }));
    };
  
    const handleOutDateChange = (date) => {
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        outDate: date
      }));
    };
    const handleResetFilter = () => {
      setTempFilter({
        country: '',
        city: '',
        inDate: dayjs(),
        outDate: dayjs(),
        guests: 1
      });
      onFilterChange(tempFilter);
      onClose();
    };
  
    const handleGuestsChange = (event) => {
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        guests: event.target.value
      }));
    };
  
    const handleClose = () => {
      onFilterChange(tempFilter);
      onClose();
    };
  
    return (
      <Modal open={isOpen} onClose={handleClose} className={classes.searchModal}>
        <div className={classes.modalContent}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countries}
            sx={{ width: 300, mb: 3 }}
            renderInput={(params) => <TextField {...params} label="Country" />}
            onChange={handleCountryChange}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countriesMap[tempFilter.country] || []}
            sx={{ width: 300, mb: 5 }}
            renderInput={(params) => <TextField {...params} label="City" />}
            onChange={handleCityChange}
          />
          
          <TextField
            className={classes.inputField}
            type="number"
            label="Guests"
            value={tempFilter.guests}
            onChange={handleGuestsChange}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleResetFilter}
        >
          Reset
        </Button>
        </div>
      </Modal>
    );
  };
  
  export default SearchPop;
  