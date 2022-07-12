import { useState } from 'react';
import ItemEl from './ItemEl';
import IconBtn from './IconBtn';
import AddItem from './AddItem';
import EditItem from './EditItem';
import { ClickAwayListener, LinearProgress } from '@mui/material';

function Items({user, defaultBalance}) {
  const [items, setItems] = useState(user.items)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
    setEditing(null)
  }

  function handleAdd(newItem) {
    setItems([...items, newItem])
    setOpen(false)
    // try redux here ???
  }
  
  function handleEdit(editedItem) {
    const updatedItems = items.filter( item => {
      if(editedItem.id === item.id) return editedItem
      else return item
    } )
    setItems(updatedItems)
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
        {(() => {
          if(open && !editing) {
            return (
              <AddItem onSubmit={handleAdd} id={user.id} defaultBalance={defaultBalance} />
            )
          }
          else if(open && editing) {
            return (
              <EditItem onSubmit={handleEdit} id={user.id} defaultBalance={defaultBalance} item={editing} balances={user.balances} />
            )
          }
          else {
            return (
              <>
                <div className="underline">
                  <div className="Heading">
                    <h4>Items</h4>
                    <p>{`Total: $${user.total_cost.toFixed(2)}`}</p>
                    {/* try redux here ??? */}
                    <IconBtn onClick={handleClick} button="Add" />
                  </div>
                  <LinearProgress variant="determinate" value={user.total_percentage} sx={{height: 12}} />
                </div>


                <p style={{textAlign: "left", fontSize: "small"}}>Click for More Info</p>
                
                {/* <ImageList gap={10} rowHeight={200}> */}
                <ul className="ItemsList">
                  {items.length > 0 ? (
                    items.map( item => (
                      <ItemEl key={item.id} item={item} onDelete={handleRemove} onEdit={(editingItem) => {
                        setEditing(editingItem)
                        setOpen(true)
                      }} />
                    ) )
                  ) : (
                    <></>
                  )}
                {/* </ImageList> */}
                </ul>
              </>
            )
          }
        })()}
        {/* {!open ? (
          <>
            <div className="Heading underline">
              <h4>Items</h4>
              <p>{`Total: $${user.total_cost.toFixed(2)}`}</p>
              <IconBtn onClick={handleClick} button="Add" />
            </div>

            <p style={{textAlign: "left", fontSize: "small"}}>Click for More Info</p>
            
            <ImageList gap={10}>
              {items.length > 0 ? (
                items.map( item => (
                  <ItemEl key={item.id} item={item} onDelete={handleRemove} onEdit={(bool) => {
                    setEditing(bool)
                    setOpen(bool)
                  }} />
                ) )
              ) : (
                <></>
              )}
            </ImageList>
          </>
        ) : (
          editing && open ? (
            <EditItem onSubmit={handleAdd} id={user.id} defaultBalance={defaultBalance} />
          ) : (
            <AddItem onSubmit={handleAdd} id={user.id} defaultBalance={defaultBalance} />
          )
        )} */}
      </div>
    </ClickAwayListener>
  )
}

export default Items;