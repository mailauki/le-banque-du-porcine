import logo from '../logo.png';

function Content({user}) {
  return(
    <div className="Content">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
      <h1>{user ? `Welcome, ${user.first_name}.` : "Nothing here yet"}</h1>
    </div>
  )
}

export default Content;