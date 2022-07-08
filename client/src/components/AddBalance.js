import { useState } from "react";
import Errors from './Errors';

function AddBalance({id, onSubmit}) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [errors, setErrors] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    fetch(`/balances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: name, amount: amount})
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data)
          onSubmit(data)
        })
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    })
  }

  return(
    <div className="AddBalance">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-input">
          <label>Amount</label>
          <input type="number" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} />
        </div>
        <button className="form-input button" type="submit">Add</button>
      </form>
      <Errors errors={errors} />
    </div>
  )
}

export default AddBalance;