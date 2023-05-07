import React, { useState } from 'react';
import { Typography, Grid, Box, Checkbox, TextField, Divider, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import image from '../images/image.jpg'

import UpperBar from '../profile/UpperBar';



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


const PropertyDetails = () => {
    const [value, setValue] = useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    // Static properties
    const title = 'Beautiful House';
    const imagePath = '../images/image.jpg';
    const rating = 4.5;
    const location = 'New York, USA';

    const maxGuests = 10
    const rules = ['No smoking', 'No pets', 'No parties'];
    const price = 250;
    const cancellationPolicy = 'Free cancellation within 48 hours';
    const emergencyAvailability = true;

    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={classes.root}>
            <UpperBar ></UpperBar>
            <Divider className={classes.divider} />
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={isSmallScreen ? 2 : 4}>
                <Grid item xs={12} sm={6}>
                    <img src={image} alt={title} className={classes.image} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Rating:</Typography>
                        <div className={classes.rating}>
                            <Typography value={rating} precision={0.5} readOnly />
                            <TextField label="rating" variant="outlined" value={`${rating}/10`} />
                        </div>
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Location:</Typography>
                        <TextField label="location" variant="outlined" value={location} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Dates:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker style={{ marginRight: '10px' }} />
                            <DatePicker style={{ marginLeft: '10px' }} />
                        </LocalizationProvider>
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Max Guests:</Typography>
                        <TextField label="Maximum guests" variant="outlined" value={`${maxGuests} person`} />
                    </Box>
                    <Box className={classes.property} >
                        <Typography variant="h6" gutterBottom>Price:</Typography>
                        <TextField label="price" variant="outlined" value={`${price}$ per night`} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Cancellation Policy:</Typography>
                        <TextField label="Cancellation Policy" variant="outlined" value={cancellationPolicy} style={{ width: "100%" }}
                        />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>House Rules:</Typography>
                        <ul>
                            {rules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                    </Box>
                    <Box className={classes.property} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom style={{ marginRight: '20px' }}>
                            Emergency Availability:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={emergencyAvailability}
                                    color="primary"
                                />
                            }
                        />
                        <Grid container justifyContent="flex-end" style={{marginRight: '50px'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2                                    
                                }}
                            >
                                Rent
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default PropertyDetails;

