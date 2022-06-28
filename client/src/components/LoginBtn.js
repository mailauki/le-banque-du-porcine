import * as React from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { Button, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';

function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const location = useLocation()
  const history = useHistory()

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
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
            backgroundColor: "#444",
            color: "#fff"
          }
        }}
        onClick={handleClick}
      >
        {location.pathname === "/login" ? "Signup" : "Login"}
      </Button>
      <Menu
        id="positioned-button"
        aria-labelledby="positioned-menu"
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
            <Login fontSize="small"/>
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