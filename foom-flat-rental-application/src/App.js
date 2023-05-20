import Box from '@mui/material/Box';

import UpperBar from './components/UpperBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import OptionsTab from 'components/OptionsTab';
import HouseCards from './components/HouseCards';
import React from 'react';
import './App.css';
import Payment from './components/Payment';
import EditProfile from './components/EditProfile'; 
import AddProperty from './components/AddProperty';
import AddProfile from './components/AddProfile';
import SignIn from './components/SignIn';
//import Footer from 'components/Footer';
//import FooterMenu from 'components/FooterMenu';
import { displayOnDesktop } from './themes/commonStyles';
//import MobileFooter from 'components/MobileFooter';

function App() {
  return (

      <Router>
        
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box>
          <UpperBar/>
        
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: 100,
            overflowY: 'scroll',
          }}
        >
          
          
        <Routes>
          <Route exact path="/" element={<SignIn/>} />
          <Route path="/Home" element={<HouseCards/>} />
          <Route path="/Register" element={<AddProfile/>}/>
          <Route path="/EditProfile" element={<EditProfile/>} />
          <Route path ="/ListHouse" element ={<AddProperty/>}/>
        
        </Routes>
       
        </Box>
       
        </Box>
      </Router>
       
     
  );
}

export default App;
