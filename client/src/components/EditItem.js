import { useState } from "react";
import Errors from './Errors';

function EditItem({id, onSubmit, defaultBalance, item, balances}) {
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [priority, setPriority] = useState(item.priority)
  const [image, setImage] = useState(item.image)
  // const [balance, setBalance] = useState(item.balance.id)
  const [errors, setErrors] = useState([])

  console.log({id: item.id, name: name, price: price, priority: priority, image: image, balance_id: defaultBalance.id})

  function handleSubmit(event) {
    event.preventDefault()

    if(defaultBalance) {
      // let balance_id = item ? balance : defaultBalance.id
      let formData = {name: name, price: price, priority: priority, image: image, balance_id: defaultBalance.id}

      if(item) {
        fetch(`/items/${item.id}`, {
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
          <label>{`Priority: #${priority}`}</label>
          <input type="range" min={1} max={5} value={priority} onChange={(event) => setPriority(parseInt(event.target.value))} />
          {/* <fieldset checked={priority} onChange={(event) => setPriority(event.target.value)}>
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
          </fieldset> */}
          <div className="form-input">
            <label>Image Url</label>
            <input type="text" value={image} onChange={(event) => setImage(event.target.value)} />
          </div>
          {/* {item ? (
            <div className="form-input">
              <label>Balance</label>
              <datalist id="balances" value={balance} onChange={(event) => setBalance(event.target.value)}>
                {balances.map( balance => {
                  <option value={balance.id}>{balance.name}</option>
                } )}
              </datalist>
            </div>
          ) : (
            <></>
          )} */}
        </div>
        <button className="form-input button" type="submit">Edit</button>
      </form>
      <Errors errors={errors} />
    </div>
  )
}

export default EditItem;