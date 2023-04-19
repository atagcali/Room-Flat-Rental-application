import React from 'react';
import { Typography, Grid, Box, Checkbox, TextField, Divider, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import image from '../images/image.jpg'

import ProfileSettings from '../profile/ProfileSettings';



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

     //Edit properties
      const title = 'Beautiful House';
      const location = 'New York, USA';
      const maxGuests = 10
      const rules = ['No smoking', 'No pets', 'No parties'];
      const price = 250;
      const cancellationPolicy = 'Free cancellation within 48 hours';
      const emergencyAvailability = true;

    //to make empty add Source of img these
    // const imagePath = '';
    // const title = '';
    // const location = '';
    // const maxGuests = '';
    // const rules = [];
    // const price = '';
    // const cancellationPolicy = '';
    // const emergencyAvailability = '';

    return (
        <div className={classes.root}>
            <ProfileSettings ></ProfileSettings>
            <Divider className={classes.divider} />
            <TextField label="title" variant="outlined" value={title} />

            <Grid container spacing={isSmallScreen ? 2 : 4}>
                <Grid item xs={12} sm={6}>
                    <img src={image} alt={title} className={classes.image} />
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
                        <Typography variant="h6" gutterBottom>Location:</Typography>
                        <TextField label="location" variant="outlined" value={location} />
                    </Box>
                    <Box className={classes.property}>
                        <Typography variant="h6" gutterBottom>Max Guests:</Typography>
                        <TextField label="Maximum guests" variant="outlined" value={maxGuests? `${maxGuests} person` : ''} />
                    </Box>
                    <Box className={classes.property} >
                        <Typography variant="h6" gutterBottom>Price:</Typography>
                        <TextField label="price" variant="outlined" value={price ? `${price}$ per night` : ''}/>
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
                        <TextField label="Add Rule" variant="outlined" style={{ width: "100%" }} />
                        <Grid container justifyContent="flex-start" style={{ marginTop: '10px' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
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
                        <Grid container justifyContent="flex-end" style={{ marginRight: '50px' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddProperty;

