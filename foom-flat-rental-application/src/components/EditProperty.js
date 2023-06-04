import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { Typography, Grid, Box, Checkbox, TextField, Divider, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import image from '../images/image.jpg'
import axios from 'axios';
import MyProperty from './MyProperty';
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


const EditProperty = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const  {id}  = useParams();
    const [house,setHouse] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    console.log(house);
     //Edit properties
    //   const title = 'Beautiful House';
    //   const location = 'New York, USA';
    //   const maxGuests = 10
    //   const rules = ['No smoking', 'No pets', 'No parties'];
    //   const price = 250;
    //   const cancellationPolicy = 'Free cancellation within 48 hours';
    //   const emergencyAvailability = true;

    //to make empty add Source of img these
    const getHouseData = async () => {
        try {
          
          const response = await axios.get(`http://localhost:8080/api/rental-properties/${id}`);
          
          setHouse(response.data);
          setIsLoading(false);
    
        } catch (error) {
          console.error('Error fetching  house:', error);
        }
      };
    
      useEffect(() => {
        getHouseData();
        console.log(house)
      }, []);
       
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'balance' || name === 'maxGuests' || name === 'maxStay' || name === 'minStay') {
      setHouse((prevHouse) => ({
        ...prevHouse,
        [name]: parseFloat(value) || 0, // Convert the value to a number or set it to 0 if it's not a valid number
      }));
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
      const response = await axios.put(`http://localhost:8080/api/rental-property/${id}`, house);
      navigate('/home');
      console.log('House data posted successfully:', response.data);
      // perform any additional actions after successful post
    } catch (error) {
      console.error('Error posting house data:', error);
      // handle the error
    }
  };
  if (isLoading) {
    // Render a loading state or placeholder while waiting for the data
    return <div>Loading...</div>;
  }
    return (
        <div className={classes.root}>
        
           <Typography variant="h6" gutterBottom>Title:</Typography>
            <TextField  variant="outlined" name= 'title' value={house.title || ''} onChange={handleChange} />

            <Grid container spacing={isSmallScreen ? 2 : 4}>
            
                <Grid item xs={12} sm={6}>
                
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Location:</Typography>
                        <TextField label="location" variant="outlined" name = 'location'onChange={handleChange}/>
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Description:</Typography>
                        <TextField  variant="outlined" value={house.description || ''} name= 'description' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Max Guests:</Typography>
                        <TextField value={house.maxGuests || ''} variant="outlined" name= 'maxGuests' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Max Stay:</Typography>
                        <TextField value={house.maxStay} variant="outlined" name= 'maxStay' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Min Stay:</Typography>
                        <TextField value={house.minStay} variant="outlined" name= 'minStay' onChange={handleChange} />
                    </Box>
                    <Box className={classes.property} >
                        <Typography variant="h6" gutterBottom>Price:</Typography>
                        <TextField value={house.price} variant="outlined" name= 'price' onChange={handleChange}/>
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Cancellation Policy:</Typography>
                        <TextField  variant="outlined" name= 'cancellationPolicy' onChange={handleChange}style={{ width: "100%" }}
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
      name="availableInEmergency"
      checked={house.availableInEmergency
      }
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
                                name= 'petFriendly'
                                checked={house.petFriendly}
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
                                Edit Property
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditProperty;

