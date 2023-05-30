import React,{useState,useEffect} from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { FaRegUserCircle } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';


const AddProfile = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('');
  const [user,setUser] = useState({
    name: 'name',
    surname: 'surname',
    password: '***',
    confirmPassword: '***',
    balance: 0,
    email: 'a@g.com',
    country: 'aa',
    city: 'nn',
    zipcode: 0,
    neighbourhood: '',
    district: '',

  });
  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/locations'); // Replace with your backend endpoint to fetch all locations
      setLocations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const countriesMap = {};
  
  locations.forEach(location => {
    const country = location.country;
    const city = location.city;
    if (country && city) {
      if (!countriesMap.hasOwnProperty(country)) {
        countriesMap[country] = [];
      }
      countriesMap[country].push(city);
    }
  });

  const countries = Object.keys(countriesMap);
  

  const handleChange2 = (event,value) => {
      setCurrentCountry(value);
      setUser({ ...user, country: value, city: '' });
      console.log(user);
    
  };
  const handleChange3 = (event,value) => {

      setUser({ ...user, city: value });
    
  };
  const handleChange = (event) => {

    setUser({ ...user, [event.target.name]: event.target.value});
    console.log(user);
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform registration logic here
    if (user.password === user.confirmPassword) {
      const data1 = {
        name: user.name,
        surname: user.surname,
        email: user.email, 
        password:user.password,
        phoneNumber: "123123",
        balance: user.balance,
        address:user.country,
        role: 'traveler',
        dateOfBirth: '2001-09-04',
      }
     const data2 = JSON.stringify(data1)
      const response = await axios.post('http://localhost:8080/api/user', data1);
      console.log('Registration successful:', response.data);
      navigate('/');
    } else {
      setIsDialogOpen(true);
      // Show an error message or perform appropriate action
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Create an Account
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
      <FaRegUserCircle size={24} />

      </Box>
      <form onSubmit={handleSubmit}>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          name = "name"
          value={user.name}
          onChange={handleChange}
        required
         
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Surname"
          name="surname"
          variant="outlined"
          value={user.surname}
          onChange={handleChange}
        required
        
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Password"
          variant="outlined"
          name = "password"
          type = "password"
          value={user.password}
          onChange={handleChange}
        required
      
        />
        
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Confirm Password"
          variant="outlined"
          type = "password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        required
      
        />
        
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Balance"
          variant="outlined"
          name = "balance"
          value={user.balance}
          onChange={handleChange}
        required
         
        />
        
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          name = "email"
          value={user.email}
          onChange={handleChange}
        required
        
         
        />
         
      </Box>
      <Box sx={{ marginBottom: 2 }}>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countries}
      sx={{ width: 300 , mb: 3}}
      renderInput={(params) => <TextField {...params} label="Country" />}
      onChange={handleChange2}
      required
    />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={countriesMap[currentCountry]}
      sx={{ width: 300 , mb: 5}}
      renderInput={(params) => <TextField {...params} label="City" />}
      onChange={handleChange3}
      required
    />
        
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="zipcode"
          variant="outlined"
          name = "zipcode"
         
          value={user.zipcode}
          onChange={handleChange}
        required
      
        />
        </Box>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="district"
          variant="outlined"
          name = "district"
         
          value={user.district}
          onChange={handleChange}
         required
      
        />
        
      </Box>
     
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="neighbourhood"
          variant="outlined"
          name = "neighbourhood"
         
          value={user.neighbourhood}
          onChange={handleChange}
        required
      
        />
        
      </Box>
      <Button type='submit'  variant='contained'  size="small" color='secondary' sx={{
            mt: 1,
            ml: 1,
        }}> Register </Button>

<Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Passwords Do Not Match</DialogTitle>
        <DialogContent>
          <p>Please make sure the passwords you entered match.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
        </form>
        
    </Box>
   
  );
};

export default AddProfile;