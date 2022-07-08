import { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import { LinearProgress } from '@mui/material';

function ItemEl({item, onDelete}) {
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

  function handleClick() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return(
    <div>
      <div className="ItemEl Heading">
        <p>{item.name} - ${parseFloat(item.price).toFixed(2)}</p>
        <p>{item.percentage ? `${Math.round(item.percentage)}%` : null}</p>
        <DeleteBtn onClick={handleDelete} />
      </div>
      {item.percentage ? (
        <LinearProgress variant="determinate" value={item.percentage} sx={{height: 12}} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default ItemEl;