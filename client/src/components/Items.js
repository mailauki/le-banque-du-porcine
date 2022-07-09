import { useState } from 'react';
import ItemEl from './ItemEl';
import IconBtn from './IconBtn';
import AddItem from './AddItem';
import { ClickAwayListener, ImageList, Tooltip } from '@mui/material';

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
    // try redux here ???
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
              <p>{`Total: $${user.total_cost.toFixed(2)}`}</p>
              {/* try redux here ??? */}
              <IconBtn onClick={handleClick} button="Add" />
            </div>
            
            <p style={{textAlign: "left", fontSize: "small"}}>Click for More Info</p>
            
            <ImageList gap={10}>
              {items.length > 0 ? (
                items.map( item => (
                  <ItemEl key={item.id} item={item} onDelete={handleRemove} />
                ) )
              ) : (
                <></>
              )}
            </ImageList>
          </>
        ) : (
          <AddItem onSubmit={handleAdd} id={user.id} defaultBalance={defaultBalance} />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Items;