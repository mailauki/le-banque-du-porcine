import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchCurrentUser } from '../features/users/currentUserSlice';
import { balanceAdded, balanceDeleted } from '../features/users/currentUserSlice';
import logo from '../logo.png';
import Items from './Items';
import Balances from './Balances';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

function Content({ user, defaultBalance }) {
  const currentUser = useSelector((state) => state.currentUser.entities)
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState("items")

  const handleChange = (event, newValue) => {
    setToggle(newValue)
  }

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  console.log({currentUser})

  function handleBalanceAdd() {
    dispatch(balanceAdded({name: "Debit", amount: 2}))
  }

  return(
    <div className="Content">
      {!currentUser ? <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div> : <></>}
      <h1>{currentUser ? `Welcome, ${currentUser.first_name}` : "Nothing here yet"}</h1>
      <ToggleButtonGroup
        color="primary"
        value={toggle}
        exclusive
        onChange={handleChange}
        aria-label="ToggleView"
      >
        <ToggleButton value="balances">Balances</ToggleButton>
        <ToggleButton value="items">Items</ToggleButton>
        <ToggleButton value="both">Both</ToggleButton>
      </ToggleButtonGroup>
      {(() => {
        switch(toggle) {
          case "balances": 
            return <Balances />
          case "items":
            return <Items />
          case "both":
            return <><Balances /><Items /></>
          default:
            return <><Balances /><Items /></>
        }
      })()}
      {/* <Balances />
      <Items /> */}
      {/* {user ? (
        <div>
          <Balances user={user} defaultBalance={defaultBalance} />
          {defaultBalance ? <Items user={user} defaultBalance={defaultBalance} /> : <></>}
          <Items user={user} defaultBalance={defaultBalance} />
        </div>
      ) : (
        <></>
      )} */}
    </div>
  )
}

export default Content;