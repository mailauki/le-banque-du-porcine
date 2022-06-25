import { Link } from 'react-router-dom';
import Menu from './Menu';
import LoginBtn from './LoginBtn'

function Account({pathname, user, onLogout}) {
  return(
    user ? (
      <Menu user={user} onLogout={onLogout} />
    ) : (
      <LoginBtn pathname={pathname} />
      // (() => {
      //   switch (pathname) {
      //     case "/login":
      //       return (
      //         <div className="LoginBtn">
      //           <Link to="/signup">
      //             <p>Signup</p>
      //           </Link>
      //         </div>
      //       )
      //     case "/signup":
      //       return (
      //         <div className="LoginBtn">
      //           <Link to="/login">
      //             <p>Login</p>
      //           </Link>
      //         </div>
      //       )
      //     default:
      //       return (
      //         <div className="LoginBtn">
      //           <Link to="/login">
      //             <p>Login</p>
      //           </Link>
      //           <p style={{paddingLeft: 4, paddingRight: 4}}>/</p>
      //           <Link to="/signup">
      //             <p>Signup</p>
      //           </Link>
      //         </div>
      //       )
      //   }
      // })()
    )
  )
}

export default Account;