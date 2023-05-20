import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import UpperBar from './components/UpperBar';
//import OptionsTab from 'components/OptionsTab';
import Container from '@mui/material/Container';
import HouseCards from './components/HouseCards';
import React from 'react';
import './App.css';
import Payment from './components/Payment';
import EditProfile from './components/EditProfile'; 
import AddProfile from './components/AddProfile'; 
//import Footer from 'components/Footer';
//import FooterMenu from 'components/FooterMenu';
import { displayOnDesktop } from './themes/commonStyles';
//import MobileFooter from 'components/MobileFooter';

function App() {
  return (
<React.Fragment>
      <CssBaseline />
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
          <Container maxWidth="xl" sx={{ mb: 3 }}>
            <AddProfile/>
           
          </Container>
        </Box>
       
        
      </Box>
    </React.Fragment>
  );
}

export default App;
