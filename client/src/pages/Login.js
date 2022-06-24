import { useState } from "react";
import { useHistory } from "react-router";
// import Errors from "../components/Errors";

function Login({onLogin}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => onLogin(user))
          // history.push("/me")
          history.push("/")
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      })
  }

  return(
    <div className="Login">
      <h1>Login</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-input">
          <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="form-input button" type="submit">Login</button>
        {/* <Errors errors={errors} /> */}
        {console.log(errors)}
      </form>
    </div>
  )
}

export default Login;