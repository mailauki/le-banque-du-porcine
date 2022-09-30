import { useState } from "react";
import Errors from './Errors';

function AddBalance({ id, onSubmit, balance }) {
  const [name, setName] = useState(balance ? balance.name : "")
  const [amount, setAmount] = useState(balance? balance.amount : 0)
  const [errors, setErrors] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    let formData = {name: name, amount: amount}

    if(balance) {
      fetch(`/users/${id}/balances/${balance.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
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
    else fetch(`/users/${id}/balances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
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