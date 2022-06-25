import * as React from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Login from '@mui/icons-material/Login';
import PersonAdd from '@mui/icons-material/PersonAdd';

function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const location = useLocation()
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleLogin() {
    setAnchorEl(null)
    history.push("/login")
  }

  function handleSignup() {
    setAnchorEl(null)
    history.push("/signup")
  }

  return (
    <div>
      <Button
        id="login-button"
        aria-controls={open ? 'login-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        sx={{
          backgroundColor: "lightcoral",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#eee",
            color: "#222"
          }
        }}
        onClick={handleClick}
      >
        {location.pathname === "/login" ? "Signup" : "Login"}
      </Button>
      <Menu
        id="demo-positioned-button"
        aria-labelledby="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleLogin}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          Login
        </MenuItem>
        <MenuItem onClick={handleSignup}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Signup
        </MenuItem>
      </Menu>
    </div>
  )
}

export default PositionedMenu;