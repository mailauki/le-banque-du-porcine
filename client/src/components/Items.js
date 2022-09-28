import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemAdded, itemDeleted, itemEdited } from '../features/users/currentUserSlice';
import ItemEl from './ItemEl';
import IconBtn from './IconBtn';
import ItemForm from './ItemForm';
import { ClickAwayListener, LinearProgress } from '@mui/material';

function Items() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const currentUser = useSelector((state) => state.currentUser.entities)
  const dispatch = useDispatch()

  const { total_cost, total_percentage, items, default_balance } = currentUser

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
    setEditing(null)
  }

  function handleAdd(newItem) {
    dispatch(itemAdded(newItem))
    setOpen(false)
  }
  
  function handleEdit(editedItem) {
    dispatch(itemEdited(editedItem))
    setOpen(false)
  }

  function handleRemove(deletedItem) {
    dispatch(itemDeleted(deletedItem))
  }

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="ItemsContainer box">
        {(() => {
          if(open && !editing) {
            return (
              <ItemForm onSubmit={handleAdd} id={currentUser.id} defaultBalance={default_balance} />
            )
          }
          else if(open && editing) {
            return (
              <ItemForm onSubmit={handleEdit} id={currentUser.id} item={editing} balances={currentUser.balances} defaultBalance={default_balance} />
            )
          }
          else {
            return (
              <>
                <div className="underline">
                  <div className="Heading">
                    <h4>Items</h4>
                    <p>{`Total: $${total_cost ? total_cost.toFixed(2) : 0}`}</p>
                    <IconBtn onClick={handleClick} button="Add" />
                  </div>
                  <LinearProgress variant="determinate" value={total_percentage} sx={{height: 12}} />
                </div>


                <p style={{textAlign: "left", fontSize: "small"}}>Click for More Info</p>
                
                <ul className="ItemsList">
                  {items && items.length > 0 ? (
                    items.map((item) => (
                      <ItemEl 
                        key={item.id} 
                        item={item} 
                        onDelete={handleRemove} 
                        onEdit={(editingItem) => {
                          setEditing(editingItem)
                          setOpen(true)
                        }} 
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </>
            )
          }
        })()}
      </div>
    </ClickAwayListener>
  )
}

export default Items;