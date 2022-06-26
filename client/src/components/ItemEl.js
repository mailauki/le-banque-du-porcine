import DeleteBtn from './DeleteBtn';

function ItemEl({item, onDelete}) {
  function handleDelete() {
    console.log({item})

    fetch(`/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      onDelete(item)
    })
  }

  return(
    <div className="ItemEl Heading">
      {item.name} - ${parseFloat(item.price).toFixed(2)}
      <DeleteBtn onClick={handleDelete} />
    </div>
  )
}

export default ItemEl;