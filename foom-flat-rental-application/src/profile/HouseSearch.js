import React from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// react icons
import { IoSearchCircleSharp } from 'react-icons/io5';
import { blue } from '@mui/material/colors';

const choices = [
    { id: 1, text: 'Apartment' },
    { id: 2, text: 'Villa' },
    { id: 3, text: 'Search', withIcon: true },
    { id: 4, text: 'My Homes' },

];



const HouseSearch = () => {
    const [flag, setFlag] = React.useState(true);
    const handleClick = () => {
        setFlag(!flag);
    };
    return (
        <Paper
            sx={{
                borderRadius: 20,
                ml: 15,
            }}
            elevation={3}
        >
            <Stack direction="row"
                sx={{
                    borderRadius: 20,
                    pl: 2,
                }}
                divider={<Divider orientation="vertical" flexItem />}
            >
                {choices.map((choice) => {
                    return (
                        <Button key={choice.id} onClick={handleClick} color={flag ? "primary" : "secondary"}>
                            <Typography
                                sx={{
                                    color: (theme) => theme.palette.text.primary,

                                }}
                            >
                                {choice.text}
                            </Typography>
                            {choice.withIcon && (
                                <Box
                                    sx={{
                                        ml: 1,
                                        mt: 1,
                                        mr: 1,
                                    }}
                                >
                                    <IoSearchCircleSharp color={blue[500]} size={25} />
                                </Box>
                            )}
                        </Button>
                    );
                })}
            </Stack>
        </Paper>
    );
};

export default HouseSearch;