import { useState } from "react";
import Errors from './Errors';

function AddItem({id, onSubmit, defaultBalance}) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [priority, setPriority] = useState(0)
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState([])

  function handleSubmit(event) {
    event.preventDefault()

    if(defaultBalance) {
      let formData = {name: name, price: price, priority: priority, image: image, balance_id: defaultBalance.id}

      console.log(formData)

      fetch("/items", {
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
  }

  return(
    <div className="AddItem">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="form-input">
          <label>Price</label>
          <input type="number" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>
        <div className="form-input">
          {/* <label>Priority</label> */}
          <fieldset value={priority} onChange={(event) => setPriority(event.target.value)}>
            <legend>Priority</legend>
            <p>High</p>
            <div>
              <input type="radio" id="1" name="priority" value={1} />
              <label for="1">1</label>
            </div>
            <div>
              <input type="radio" id="2" name="priority" value={2} />
              <label for="2">2</label>
            </div>
            <div>
              <input type="radio" id="3" name="priority" value={3} />
              <label for="3">3</label>
            </div>
            <p>Low</p>
          </fieldset>
          <div className="form-input">
            <label>Image Url</label>
            <input type="url" value={image} onChange={(event) => setImage(event.target.value)} />
          </div>
        </div>
        <button className="form-input button" type="submit">Add</button>
      </form>
      <Errors errors={errors} />
    </div>
  )
}

export default AddItem;