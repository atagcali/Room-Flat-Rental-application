import Box from '@mui/material/Box';

import UpperBar from './components/UpperBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import OptionsTab from 'components/OptionsTab';
import HouseCards from './components/HouseCards';
import React,{useState} from 'react';
import './App.css';
import Payment from './components/Payment';
import EditProfile from './components/EditProfile'; 
import AddProperty from './components/AddProperty';
import AddProfile from './components/AddProfile';
import SignIn from './components/SignIn';
import MyHouses from './components/MyHouses';
import BookedProperty from './components/BookedProperty';
//import Footer from 'components/Footer';
//import FooterMenu from 'components/FooterMenu';
import { displayOnDesktop } from './themes/commonStyles';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import Messages from './components/Messages';
import ChangePassword from './components/changePassword';
import AddBalance from './components/AddBalance';
import ChangeEmail from './components/ChangeEmail';
import EditProperty from './components/EditProperty';

//import MobileFooter from 'components/MobileFooter';

function App() {
  const [filter, setFilter] = useState({
    country: '',
    city: '',
    guest: 0,
    inDate: '',
    outDate: '',
  });
  const handleFilterChange = (updatedFilter) => {
    setFilter(updatedFilter);
  };
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
          <UpperBar filter={filter} onFilterChange={handleFilterChange}/>
        
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
          <Route path="/Home" element={<HouseCards filter={filter}/>} />
          <Route path="/MyHouses" element={<MyHouses/>} />
          <Route path="/MyBookings" element={<BookedProperty/>} />
          <Route path="/Register" element={<AddProfile/>}/>
          <Route path="Payment/:id" element = {<Payment/>} />
          <Route path="/EditProfile" element={<EditProfile/>} />
          <Route path ="/ListHouse" element ={<AddProperty/>}/>
          <Route path ="/Edit/:id" element ={<EditProperty/>}/>
          <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage/>}/>
          <Route path="/Messages" element={<Messages/>}/>
          <Route path="/ChangePassword" element={<ChangePassword/>}/>
          <Route path="/AddBalance" element={<AddBalance/>}/>
          <Route path="/ChangeEmail" element={<ChangeEmail/>}/>
        </Routes>
       
        </Box>
       
        </Box>
      </Router>
       
     
  );
}

export default App;
