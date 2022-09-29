import { useState } from 'react';
import { useHistory } from 'react-router';
import Errors from '../components/Errors';

function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()

    setErrors([])

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password, password_confirmation: passwordConfirmation, first_name: firstName})
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        // history.push("/me")
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return(
    <div className="Signup">
      <h1>Signup</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-input">
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-input">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-input">
          <label>Password Confirmation</label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
        <button className="form-input button">Signup</button>
      </form>
      <Errors errors={errors} />
    </div>
  )
}

export default Signup;