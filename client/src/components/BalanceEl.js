import IconBtn from './IconBtn';

function BalanceEl({balance, onDelete}) {
  function handleDelete() {
    console.log({balance})

    fetch(`/balances/${balance.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      onDelete(balance)
    })
  }

  return(
    <div className="BalanceEl Heading">
      {/* <p>{balance.name} - ${balance.amount.toFixed(2)}</p> */}
      <p>{balance.name}</p>
      <p>${balance.amount.toFixed(2)}</p>
      {/* <DeleteBtn onClick={handleDelete} /> */}
      <IconBtn onClick={handleDelete} button="Delete" />
    </div>
  )
}

export default BalanceEl;