import { Link } from 'react-router-dom';
import Account from './Account';

function Header({pathname, user, onLogout}) {
  return(
    <header className="Header">
      <Link to="/">
        <h1>Le Banque Du Porcine</h1>
      </Link>
      <Account pathname={pathname} user={user} onLogout={onLogout} />
    </header>
  )
}

export default Header;