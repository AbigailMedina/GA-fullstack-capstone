import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom'; 
import './Header.css';
import menu from './menu.png';

const Header = ({ title, currUser }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <header className="header">
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={(event) => { console.log("hi"); handleClick(event) }}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <ListItemIcon>
            <img src={menu} alt="Menu" style={{ width: 50, height: 50 }} />
          </ListItemIcon>
          </IconButton>
        </Tooltip>
      </Box>
      
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >


        <MenuItem onClick={handleClose}>
          {/* <ListItemIcon>
            <img src={blogging} alt="Blog" style={{ width: 24, height: 24 }} />
          </ListItemIcon> */}
          <Link to="/expenses">Expenses</Link>
        </MenuItem>
        
        <MenuItem onClick={handleClose}>
          {/* <ListItemIcon>
            <img src={pokemon} alt="Pokemon" style={{ width: 24, height: 24 }} />
          </ListItemIcon> */}
          <Link to="/goals">Goals</Link>
        </MenuItem>
      </Menu>

      <div className="header-title">{title}</div>
      {/* <div className="header-user">
        {currUser ? `Logged in as: ${currUser}` : 'Not logged in'}
      </div> */}
    </header>
  );
};



Header.defaultProps = {
  userName: ''
};

export default Header;