import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchCurrentUser } from '../features/users/currentUserSlice';
import { balanceAdded, balanceDeleted } from '../features/users/currentUserSlice';
import logo from '../logo.png';
import Items from './Items';
import Balances from './Balances';

function Content({user, defaultBalance}) {
  // const users = useSelector((state) => state.users.entities)
  const currentUser = useSelector((state) => state.currentUser.entities)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchUsers())
    dispatch(fetchCurrentUser())
  }, [dispatch])

  // console.log({users})
  console.log({currentUser})

  function handleBalanceAdd() {
    dispatch(balanceAdded({name: "Debit", amount: 2}))
  }

  return(
    <div className="Content">
      {!user ? <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div> : <></>}
      <h1>{user ? `Welcome, ${currentUser.first_name}` : "Nothing here yet"}</h1>
      {/* {console.log(user)}
      {console.log({defaultBalance})} */}
      <Balances />
      <Items />
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