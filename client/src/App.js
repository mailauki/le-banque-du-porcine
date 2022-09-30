import './styles/App.css';
import './styles/Header.css';
import './styles/Errors.css';
import './styles/Form.css';
import './styles/Lists.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, logout } from './features/users/currentUserSlice'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null)
  const [defaultBalance, setDefaultBalance] = useState(null)
  let pathname = useLocation().pathname

  const currentUser = useSelector((state) => state.currentUser.entities)
  const isLoggedIn = useSelector((state) => state.currentUser.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setDefaultBalance(user.balances[0])
          })
        }
      })
  }, [])

  return (
    <div className="App">
      <Header pathname={pathname} user={user} onLogout={(log) => {
        setUser(log)
        dispatch(logout())
        }} />

      <div className="Body">
        <Switch>
          <Route path="/login">
            <Login onLogin={setUser} />
          </Route>
          <Route path="/signup">
            <Signup onLogin={setUser} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home user={user} defaultBalance={defaultBalance} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
