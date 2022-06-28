import { Link } from 'react-router-dom';
import Menu from './Menu';
import LoginBtn from './LoginBtn'

function Account({pathname, user, onLogout}) {
  return(
    user ? (
      <Menu user={user} onLogout={onLogout} />
    ) : (
      <LoginBtn pathname={pathname} />
    )
  )
}

export default Account;