import { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import IconBtn from './IconBtn';
import { Avatar, ClickAwayListener, CircularProgress, Box, Fab, Typography } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

function ItemEl({ item, onDelete, onEdit }) {
  const { name, price, priority, percentage, image } = item
  const percent = <Avatar
    sx={{ color: "#000", bgcolor: "rgba(255, 255, 255, 0.54)", marginRight: "6px", padding: "2px", width: 32, height: 32, fontSize: "16px" }}
  >{`${percentage}%`}</Avatar>
  const [button, setButton] = useState(percent)
  const [open, setOpen] = useState(false)

  const priorityColor = priority === 1 ? "red" : "gray"

  const customIcons = {
    1: <LooksOneIcon color="error" />,
    2: <LooksTwoIcon color="warning" />,
    3: <Looks3Icon color="success" />,
  }

  function handleDelete() {
    fetch(`/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      onDelete(item)
    })
  }

  function handleHoverOn() {
    setButton(<DeleteBtn onClick={handleDelete} />)
  }

  function handleHoverOff() {
    setButton(percent)
  }

  function handleEdit() {
    console.log("edit")

    onEdit(item)

    // fetch(`/items/${item.id}`)
    // .then((r) => r.json())
    // .then((data) => console.log(data))
  }

  function handleClick() {
    setOpen((prev) => !prev)
  }

  function handleClickAway() {
    setOpen(false)
  }

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
      <li className="ItemEl">
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        borderRadius: "50%", 
        padding: "2px" 
      }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab
            aria-label="more"
            color="#fff"
            onClick={handleClick}
            sx={{ width: 152, height: 152 }}
          >
            <Avatar alt={name} src={image} sx={{ width: "100%", height: "100%", backgroundColor: "#fff" }} />
          </Fab>
          <CircularProgress
            size={172}
            variant="determinate"
            value={percentage}
            sx={{
              position: "absolute",
              top: -10,
              left: -10,
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
        {open ? (
          <div className="moreInfo">
            <h4>{name}</h4>
            <div className="moreButtons">
              <div className="moreInfo">
                <p>Price: ${price.toFixed(2)}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" component="span">Priority: </Typography>
                <span>{customIcons[priority]}</span>
                </div>
              </div>
              <div>
                <IconBtn onClick={handleEdit} button="Edit" />
                <IconBtn onClick={handleDelete} button="Delete" />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </li>
    </ClickAwayListener>
  )
}

export default ItemEl;