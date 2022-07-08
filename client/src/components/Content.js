import logo from '../logo.png';
import Items from './Items';
import Balances from './Balances';

function Content({user, defaultBalance}) {
  return(
    <div className="Content">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <h1>{user ? `Welcome, ${user.first_name}` : "Nothing here yet"}</h1>
      {console.log(user)}
      {console.log({defaultBalance})}
      {user ? (
        <div>
          {/* {user.items > 0 ? (
            user.items.map( item => {
              // <p>{`${item.name} - $${item.total_balance}`}</p>
              <p>{`${item.name} - $${parseFloat(item.price).toFixed(2)}`}</p>
            })
          ) : (
            <></>
          )} */}
          <Balances user={user} defaultBalance={defaultBalance} />
          {defaultBalance ? <Items user={user} defaultBalance={defaultBalance} /> : <></>}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Content;