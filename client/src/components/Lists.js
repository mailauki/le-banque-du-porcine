import { useEffect, useState } from 'react';
import ListEl from './ListEl';
import AddList from './AddList';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';

function Lists({user}) {
  const [lists, setLists] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch("/lists")
    .then((r) => r.json())
    .then((data) => setLists(data))
  }, [])

  function handleAdd(data) {
    setLists([...lists, data])
    setIsEditing(false)
  }

  return(
    user ? (
      !isEditing ? (
        <div className="ListsContainer box">
          <div className="Lists">
            {user.lists.map( list => (
              <ListEl key={list.id} list={list} />
            ) )}
          </div>
          <IconButton
            onClick={() => setIsEditing(true)}
            id="button"
            aria-label="add list"
            component="span"
            color="primary"
            sx={{
              "&:hover": {
                backgroundColor: "#eee2",
                color: "#eee"
              }
            }}
          >
            <Add fontSize="small" className="icon" />
          </IconButton>
        </div>
      ) : (
        <AddList onSubmit={handleAdd} />
      )
    ) : (
      <></>
    )
  )
}

export default Lists;