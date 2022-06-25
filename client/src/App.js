import './styles/App.css';
import './styles/Header.css';
import './styles/Errors.css';
import './styles/Form.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(null)
  let pathname = useLocation().pathname

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
        }
      })
  }, [])

  console.log({user})

  return (
      <div className="App">
        <Header pathname={pathname} user={user} onLogout={setUser} />

        <div className="Body">
          <Switch>
            <Route path="/login">
              <Login onLogin={setUser} />
            </Route>
            <Route path="/signup">
              <Signup onLogin={setUser} />
            </Route>
            <Route path="/">
              <Home user={user} />
            </Route>
          </Switch>
        </div>
      </div>
  );
}

export default App;
