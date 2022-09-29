import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, logout } from '../features/users/currentUserSlice';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';

function AccountMenu({user, onLogout}) {
  const [anchor, setAnchor] = useState(null)
  const open = Boolean(anchor)
  const dispatch = useDispatch()

  function handleClick(event) {
    setAnchor(event.currentTarget)
  }
  
  function handleClose () {
    setAnchor(null)
  }

  let letter = user ? user.username.charAt(0).toUpperCase() : ""

  function handleLogout() {
    console.log("logout")

    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if(r.ok) {
        onLogout(null)
        // history.push("/")
      }
    })

    dispatch(logout())
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account Settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{letter}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchor}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{color: "#222"}}>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem>
          <Avatar /> My Account
        </MenuItem> */}
        <Divider />
        {/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add Another Account
        </MenuItem> */}
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu;