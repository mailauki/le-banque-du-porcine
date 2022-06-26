import ItemEl from './ItemEl';
import AddBtn from './AddBtn';

function Items({items}) {
  return(
    <div className="Items">
      <div className="Heading">
        <h4>Items</h4>
        <AddBtn />
      </div>
      {items ? items.map( item => <ItemEl item={item} /> ) : <></>}
    </div>
  )
}

export default Items;