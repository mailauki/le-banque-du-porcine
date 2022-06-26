import DeleteBtn from './DeleteBtn';

function ItemEl({item}) {
  function handleDelete() {
    console.log({item})
  }

  return(
    <div className="ItemEl Heading">
      {item.name} - ${parseFloat(item.price).toFixed(2)}
      <DeleteBtn handleDelete={handleDelete} />
    </div>
  )
}

export default ItemEl;