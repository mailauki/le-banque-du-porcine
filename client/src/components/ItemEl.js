import { useState, useEffect } from 'react';
import DeleteBtn from './DeleteBtn';
// import { LinearProgress } from '@mui/material';

function ItemEl({item, onDelete}) {
  const [open, setOpen] = useState(false)
  const [balances, setBalances] = useState([])
  const [balance, setBalance] = useState("")

  useEffect(() => {
    fetch("/me")
    .then((r) => r.json())
    .then((data) => setBalances(data.balances))
  }, [])

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

  function handleChange(event) {
    setBalance(event.target.value)

    fetch("/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({balance_id: event.target.value, item_id: item.id})
    })
    .then((r) => r.json())
    .then((data) => setOpen(false))
  }

  return(
    <div>
      <div className="ItemEl Heading">
        <p>{item.name} - ${parseFloat(item.price).toFixed(2)}</p>
        {/* <p>{item.goal ? `${Math.round(item.goal.percentage)}%` : null}</p> */}
        <DeleteBtn onClick={handleDelete} />
      </div>
      {/* {item.goal ? (
        <LinearProgress variant="determinate" value={item.goal.percentage} sx={{height: 12}} />
      ) : (
        <></>
      )} */}
    </div>
  )
}

export default ItemEl;