import { Link } from 'react-router-dom';
import LoginBtn from './LoginBtn';
import Menu from './AccountMenu';

function Header({pathname, user, onLogout}) {
  return(
    <header className="Header">
      <Link>
        <h1>Le Banque Du Porcine</h1>
      </Link>
      <LoginBtn pathname={pathname} user={user} onLogout={onLogout} />
    </header>
  )
}

export default Header;