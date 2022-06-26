import Items from './Items';
import DeleteBtn from './DeleteBtn';

function ListEl({list, onDelete}) {
  function handleDelete() {
    fetch(`/lists/${list.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      onDelete(list)
    })
  }

  return(
    <div className="ListEl box">
      <div className="Heading underline">
        <p>{list.name}</p>
        <p>Total: ${parseFloat(list.total_cost).toFixed(2)}</p>
        <DeleteBtn onClick={handleDelete} />
      </div>
      <Items list={list} />
    </div>
  )
}

export default ListEl;