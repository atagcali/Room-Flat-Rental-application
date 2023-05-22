import React,{useState} from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { FaRegUserCircle } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

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

const AddProfile = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  const [user,setUser] = useState({
    name: 'name',
    surname: 'surname',
    password: '***',
    confirmPassword: '***',
    balance: 0,
    email: 'a@g.com',
    country: 'aa',
    city: 'nn',

  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const [cha, setcha] = useState(10)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform registration logic here
    if (user.password === user.confirmPassword) {
      console.log('Registration form submitted:', user);
      navigate('/home');
      // Passwords match, proceed with registration
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
        Profile
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
      onChange={handleChange}
      required
    />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cities}
      sx={{ width: 300 , mb: 5}}
      renderInput={(params) => <TextField {...params} label="City" />}
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