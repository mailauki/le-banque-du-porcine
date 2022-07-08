import { useState } from "react";
import Errors from './Errors';

function AddItem({id, onSubmit, defaultBalance}) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [errors, setErrors] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    if(defaultBalance) {
      fetch(`/${id}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, price: price})
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
  }

  return(
    <div className="AddItem box">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-input">
          <label>Price</label>
          <input type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>
        <button className="form-input button" type="submit">Add</button>
      </form>
      <Errors errors={errors} />
    </div>
  )
}

export default AddItem;