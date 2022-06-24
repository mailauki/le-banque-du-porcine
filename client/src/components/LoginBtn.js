import { NavLink } from 'react-router-dom';

function LoginBtn({pathname}) {
  return(
    (() => {
      switch (pathname) {
        case "/login":
          return (
            <div className="LoginBtn">
              <NavLink to="/signup">
                <p>Signup</p>
              </NavLink>
            </div>
          )
        case "/signup":
          return (
            <div className="LoginBtn">
              <NavLink to="/login">
                <p>Login</p>
              </NavLink>
            </div>
          )
        default:
          return (
            <div className="LoginBtn">
              <NavLink to="/login">
                <p>Login</p>
              </NavLink>
              <p>/</p>
              <NavLink to="/signup">
                <p>Signup</p>
              </NavLink>
            </div>
          )
      }
    })()
  )
}

export default LoginBtn;