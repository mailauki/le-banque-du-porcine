import { useState } from "react";
import Errors from './Errors';

function AddWallet({onSubmit}) {
  const [name, setName] = useState("")
  const [errors, setErrors] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    fetch("/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: name})
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          onSubmit(data)
        })
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return(
    <div className="AddWallet box">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <button className="form-input button" type="submit">Add</button>
      </form>
      <Errors errors={errors} />
    </div>
  )
}

export default AddWallet;