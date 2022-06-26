import DeleteBtn from './DeleteBtn';

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
      {balance.name} - ${parseFloat(balance.amount).toFixed(2)}
      <DeleteBtn onClick={handleDelete} />
    </div>
  )
}

export default BalanceEl;