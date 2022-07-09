import { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import IconBtn from './IconBtn';
import { LinearProgress, ImageListItem, ImageListItemBar, Avatar, ClickAwayListener } from '@mui/material';

function ItemEl({item, onDelete}) {
  const percent = <Avatar
    sx={{ color: "#000", bgcolor: "rgba(255, 255, 255, 0.54)", marginRight: "6px", padding: "2px", width: 32, height: 32, fontSize: "16px" }}
  >{`${item.percentage}%`}</Avatar>
  const [button, setButton] = useState(percent)
  const [open, setOpen] = useState(false)

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

    fetch(`/items/${item.id}`)
    .then((r) => r.json())
    .then((data) => console.log(data))
  }

  function handleClick() {
    setOpen((prev) => !prev)
  }

  function handleClickAway() {
    setOpen(false)
  }

  const image = 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c'

  return(
    // <div>
    //   <div className="ItemEl Heading">
    //     <p>{item.name}</p>
    //     <p>${item.price.toFixed(2)}</p>
    //     <p>{item.percentage ? `${Math.round(item.percentage)}%` : null}</p>
    //     <DeleteBtn onClick={handleDelete} />
    //   </div>
    //   {item.percentage ? (
    //     <LinearProgress variant="determinate" value={item.percentage} sx={{height: 12}} />
    //   ) : (
    //     <></>
    //   )}
    // </div>
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="ItemEl" onClick={handleClick}>
        <ImageListItem>
          <img
            src={`${item.image ? item.image : image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image ? item.image : image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            // subtitle={`$${item.price.toFixed(2)} - #${item.priority}`}
            actionIcon={
              <div
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
              >{button}</div>
            }
            sx={{ textAlign: "left" }}
          />
        </ImageListItem>
        <LinearProgress variant="determinate" value={item.percentage} sx={{height: 12}} />
        {open ? (
          <div className="moreEdit">
            <div className="moreInfo">
              <p>{`Price: $${item.price.toFixed(2)}`}</p>
              <p>{`Priority: #${item.priority}`}</p>
            </div>
            <IconBtn onClick={handleEdit} button="Edit" />
          </div>
          // <ImageListItem>
          //   <ImageListItemBar
          //   position="below"
          //   title={`Price: $${item.price.toFixed(2)}`}
          //   subtitle={`Priority: #${item.priority}`}
          //   actionIcon={
          //     <IconBtn onClick={handleEdit} button="Edit" />
          //     // <DeleteBtn onClick={handleEdit} />
          //   }
          //   sx={{ textAlign: "left", padding: "4px 4px 0 14px" }}
          // />
          // </ImageListItem>
        ) : (
          <></>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default ItemEl;