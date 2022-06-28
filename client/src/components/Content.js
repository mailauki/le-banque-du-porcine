import logo from '../logo.png';
import Wallets from './Wallets';
import Lists from './Lists';

function Content({user, defaultBalance}) {
  return(
    <div className="Content">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <h1>{user ? `Welcome, ${user.first_name}` : "Nothing here yet"}</h1>
      <Wallets user={user} />
      <Lists user={user} defaultBalance={defaultBalance} />
    </div>
  )
}

export default Content;