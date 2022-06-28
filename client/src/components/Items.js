import { useEffect, useState } from 'react';
import ItemEl from './ItemEl';
import AddBtn from './AddBtn';
import AddItem from './AddItem';
import { ClickAwayListener } from '@mui/material';

function Items({list, defaultBalance}) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(list) {
      fetch(`/${list.id}/items`)
      .then((r) => r.json())
      .then((data) => setItems(data))
    }
  }, [list])

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(newItem) {
    setItems([...items, newItem])
    setOpen(false)

    fetch("/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({item_id: newItem.id, balance_id: defaultBalance.id})
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((goal) => console.log(goal))
        // set to state
      } else {
        r.json().then((err) => console.log(err.errors))
      }
    })
  }

  function handleRemove(deletedItem) {
    const updatedItems = items.filter( item => {
      if(item.id !== deletedItem.id) return item
    } )
    setItems(updatedItems)
  }

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="ItemsContainer">
        {!open ? (
          <>
            <div className="Heading">
              <h4>Items</h4>
              <AddBtn onClick={handleClick} />
            </div>
            <div className="Items">
              {items.length > 0 ? (
                items.map( item => (
                  <ItemEl key={item.id} item={item} onDelete={handleRemove} />
                ) )
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <AddItem onSubmit={handleAdd} id={list.id} />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Items;