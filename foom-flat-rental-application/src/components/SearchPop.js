import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
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
    const [priceRange, setPriceRange] = useState([0, 10000]); // Initial price range values

    const handlePriceChange = (event, newValue) => {
      setPriceRange(newValue);
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        minPrice: newValue[0],
        maxPrice: newValue[1],
      }));

    };
  
    useEffect(() => {
      setPriceRange([filter.minPrice,filter.maxPrice]);
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
      console.log(tempFilter.country);
    };
    
    const handleTitleChange = (event) => {
      const value = event.target.value;
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        title: value
      }));
     
    };
  
    const handleCityChange = (event, value) => {
      setTempFilter((prevFilter) => ({
        ...prevFilter,
        city: value
      }));
      console.log(tempFilter.city);
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
      const newFilter = {
        country: '',
        city: '',
        inDate: dayjs(),
        outDate: dayjs(),
        guests: 1,
        title: '',
        minPrice: 0,
        maxPrice: 9999,
      };
      setTempFilter(newFilter);
      onFilterChange(newFilter);
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
        <TextField
            className={classes.inputField}
            label="Title"
            value={tempFilter.title}
            onChange={handleTitleChange}
          />
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
        
             <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000}
      />
       <p>Lower Price: ${priceRange[0]}</p>
      <p>Higher Price: ${priceRange[1]}</p>
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
  