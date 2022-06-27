import { useEffect, useState } from 'react';
import ListEl from './ListEl';
import AddBtn from './AddBtn';
import AddList from './AddList';
import { ClickAwayListener } from '@mui/material';

function Lists({user}) {
  const [lists, setLists] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch("/lists")
    .then((r) => r.json())
    .then((data) => setLists(data))
  }, [])

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(data) {
    setLists([...lists, data])
    setOpen(false)
  }

  function handleRemove(deletedList) {
    const updatedLists = lists.filter( list => {
      if(list.id !== deletedList.id) return list
    } )
    setLists(updatedLists)
  }

  return(
    user ? (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="ListsContainer box">
          {!open ? (
            <>
              <div className="Heading">
                <h3>Lists</h3>
                <AddBtn onClick={handleClick} />
              </div>
              <div className="Lists">
                {lists.length > 0 ? (
                  lists.map( list => (
                    <ListEl key={list.id} list={list} onDelete={handleRemove} />
                  ) )
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <AddList onSubmit={handleAdd} />
          )}
        </div>
      </ClickAwayListener>
    ) : (
      <></>
    )
  )
}

export default Lists;