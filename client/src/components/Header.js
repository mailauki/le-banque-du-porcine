import LoginBtn from './LoginBtn'

function Header({pathname}) {
  return(
    <header className="Header">
      <h1>Le Banque Du Porcine</h1>
      <LoginBtn pathname={pathname} />
    </header>
  )
}

export default Header;