import { useEffect, useState } from 'react';
import ItemEl from './ItemEl';
import AddBtn from './AddBtn';
import AddItem from './AddItem';
import { ClickAwayListener } from '@mui/material';

function Items({list}) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`/${list.id}/items`)
    .then((r) => r.json())
    .then((data) => setItems(data))
  }, [])

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(data) {
    setItems([...items, data])
    setOpen(false)
  }

  function handleRemove(deletedItem) {
    const updatedItems = items.filter( item => {
      if(item.id !== deletedItem.id) return item
    } )
    setItems(updatedItems)
  }

  console.log({items})

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