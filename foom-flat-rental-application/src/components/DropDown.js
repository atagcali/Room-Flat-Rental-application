import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineMenu } from 'react-icons/ai';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  dropdownIcon: {
    color: 'blue',
  },
}));

const DropDown = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.dropdownIcon}
        onClick={handleMenuOpen}
        aria-controls="navbar-dropdown"
        aria-haspopup="true"
        aria-label="navbar-dropdown"
      >
        <AiOutlineMenu />
      </IconButton>
      <Menu
        id="navbar-dropdown"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/EditProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
            Edit Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/Settings" style={{ textDecoration: 'none', color: 'inherit' }}>
            Settings
          </Link>
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </div>
  );
};

export default DropDown;
