import { useState } from 'react';
import ItemEl from './ItemEl';
import AddBtn from './AddBtn';
import AddItem from './AddItem';
import { ClickAwayListener } from '@mui/material';

function Items({user, defaultBalance}) {
  const [items, setItems] = useState(user.items)
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(newItem) {
    setItems([...items, newItem])
    setOpen(false)
  }

  function handleRemove(deletedItem) {
    const updatedItems = items.filter( item => {
      if(item.id !== deletedItem.id) return item
    } )
    setItems(updatedItems)
  }

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="ItemsContainer box">
        {!open ? (
          <>
            <div className="Heading underline">
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
          <AddItem onSubmit={handleAdd} id={user.id} defaultBalance={defaultBalance} />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Items;