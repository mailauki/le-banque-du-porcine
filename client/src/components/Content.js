import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, login } from '../features/users/currentUserSlice';
import logo from '../logo.png';
import Items from './Items';
import Balances from './Balances';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

function Content({ user, defaultBalance }) {
  const currentUser = useSelector((state) => state.currentUser.entities)
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn)
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState("both")
  const state = useSelector((state) => state.currentUser)

  const handleChange = (event, newValue) => {
    setToggle(newValue)
  }

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  // console.log({currentUser})
  console.log({user})
  console.log(state)

  return(
    <div className="Content">
      {!isLoggedIn ? (
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default Content;