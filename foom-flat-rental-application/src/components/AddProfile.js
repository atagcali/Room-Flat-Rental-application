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
 
  const [user,setUser] = useState({
    name: 'name',
    surname: 'surname',
    password: '***',
    confirmPassword: '***',
    balance: 0,
    email: 'a@g.com',
    adress: 'aa',
    dateofBirth: 'YYYY-MM-DD',
    phoneNumber: 'xxxx',
   

  });
 
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'balance') {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: parseFloat(value) || 0, // Convert the value to a number or set it to 0 if it's not a valid number
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
   
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
        phoneNumber: user.phoneNumber,
        balance: user.balance,
        address:user.adress,
        role: 'traveler',
        dateOfBirth: user.dateofBirth,
      }
     
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
        <TextField
          label="PhoneNumber"
          variant="outlined"
          name = "phoneNumber"
         
          value={user.phoneNumber}
          onChange={handleChange}
        required
      
        />
        </Box>

      
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Adress"
          variant="outlined"
          name = "adress"
         
          value={user.adress}
          onChange={handleChange}
        required
      
        />
        </Box>
        
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="DateofBirth"
          variant="outlined"
          name = "dateofBirth"
          value={user.dateofBirth}
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