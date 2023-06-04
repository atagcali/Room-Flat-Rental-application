import React,{useState, useEffect} from 'react';
import { Typography, Grid, Box, Checkbox, TextField, Divider, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import image from '../images/image.jpg'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    property: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(4, 0),
    },
}));


const AddProperty = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const userData = localStorage.getItem('userData');
    const data1 = JSON.parse(userData);
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [locationId, setLocationId] = useState(0);
    const [tempFilter, setTempFilter] = useState('');
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
  
      
        fetchData();
      
    }, []);
    const citiesMap = {};
    locations.forEach((location) => {
      const country1 = location.country;
      const city2 = location.city;
      const id = location.id;
      if (country1 && city2) {
        if (!countriesMap.hasOwnProperty(country1)) {
          countriesMap[country1] = [];
        }
        
        
       countriesMap[country1][id] = city2;
       citiesMap[city2] = id;
      }
    });
  
    const countries = Object.keys(countriesMap);
   
    //to make empty add Source of img these
    const [house,setHouse] = useState({
        title: 'title',
        surname: 'surname',
        description: '***',
        availabilityCalendar: 'a000',
        price: 0.0,
        maxGuests: 0,
        photos: 'default',
        minStay: 0,
        maxStay: 0,
        locationId: 1,
        rating: 0.0,
        rules: 'as',
        cancellationPolicy: 'y',
        isAvailableInEmergency: false,
        isPetFriendly: false,
        hasParking: false,
        hasBalcony: false,
        hasPool: false,
        userId: data1.userId,
       
    
      });
       
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'balance' || name === 'maxGuests'  || name === 'maxStay' || name === 'minStay' || name === 'locationId') {
      setHouse((prevHouse) => ({
        ...prevHouse,
        [name]: parseFloat(value) || 0, // Convert the value to a number or set it to 0 if it's not a valid number
      }));
      console.log(house);
    } 
    else if(name === 'price'){
        setHouse((prevHouse) => ({
            ...prevHouse,
            [name]: parseFloat(value) || 0, // Convert the value to a number or set it to 0 if it's not a valid number
          }));
    }
    else {
      setHouse((prevHouse) => ({
        ...prevHouse,
        [name]: value,
      }));
    }
   
  };
  const handleCountryChange = (event, value) => {
    setTempFilter(value);
};

const handleCityChange = (event, value) => {
    setLocationId(citiesMap[value]);
    setHouse(prevHouse => ({
        ...prevHouse,
        locationId: parseInt(citiesMap[value]),
      }));

      

};
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setHouse((prevHouse) => ({
      ...prevHouse,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/rental-property', house);
      navigate('/home');
      console.log('House data posted successfully:', response.data);
      // perform any additional actions after successful post
    } catch (error) {
      console.error('Error posting house data:', error);
      // handle the error
    }
  };
    return (
        <div className={classes.root}>
           
            
            <TextField label="title" variant="outlined" name= 'title' onChange={handleChange} />

            <Grid container spacing={isSmallScreen ? 2 : 4}>
                <Grid item xs={12} sm={6}>
                    
                    <Grid container justifyContent="center" alignItems="center" style={{ marginRight: '50px' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}
                        >
                            Add Photo
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.property}>
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
            options={countriesMap[tempFilter] || []}
            sx={{ width: 300, mb: 5 }}
            renderInput={(params) => <TextField {...params} label="City" />}
            onChange={handleCityChange}
          />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Description:</Typography>
                        <TextField label="location" variant="outlined"name= 'description' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Max Guests:</Typography>
                        <TextField label="Maximum guests" variant="outlined" name= 'maxGuests' onChange={handleChange} />
                    </Box>
                      <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Max Stay:</Typography>
                        <TextField label="Maximum Stay" variant="outlined" name= 'maxStay' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Min Stay:</Typography>
                        <TextField label="Minimum Stay" variant="outlined" name= 'minStay' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property} >
                        <Typography variant="h6" gutterBottom>Price:</Typography>
                        <TextField label="price" variant="outlined" name= 'price' onChange={handleChange}/>
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Cancellation Policy:</Typography>
                        <TextField label="Cancellation Policy" variant="outlined" name= 'cancellationPolicy' onChange={handleChange}style={{ width: "100%" }}
                        />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>House Rules:</Typography>
                      
                        <TextField label="Add Rule" name='rules' onChange={handleChange} variant="outlined" style={{ width: "100%" }} />
                     
                    </Box>
                    <Box className={classes.property} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom style={{ marginRight: '20px' }}>
                            Emergency Availability:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                name='isAvailableInEmergency'
                                checked={house.isAvailableInEmergency}
                                onChange={handleCheckboxChange}
                                />
                            }
                        />
                         <Typography variant="h6" gutterBottom style={{ marginRight: '20px' }}>
                            Pet Friendly:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                name= 'isPetFriendly'
                                checked={house.isPetFriendly}
                                onChange={handleCheckboxChange}
                                />
                            }
                        />
                         <Typography variant="h6" gutterBottom style={{ marginRight: '20px' }}>
                            Balcony:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                name= 'hasBalcony'
                                checked={house.hasBalcony}
                                onChange={handleCheckboxChange}
                                />
                            }
                        />
                         <Typography variant="h6" gutterBottom style={{ marginRight: '20px' }}>
                            Pool:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                name= 'hasPool'
                                checked={house.hasPool}
                                onChange={handleCheckboxChange}
                                />
                            }
                        />
                         <Typography variant="h6" gutterBottom style={{ marginRight: '20px' }}>
                            Parking:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                name= 'hasParking'
                                checked={house.hasParking}
                                onChange={handleCheckboxChange}
                                />
                            }
                        />
                        <Grid container justifyContent="flex-end" style={{ marginRight: '50px' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                                onClick = {handleSubmit}
                            >
                                Add Property
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddProperty;

