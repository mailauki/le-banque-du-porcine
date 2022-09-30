import { useSelector } from 'react-redux';
import IconBtn from './IconBtn';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function BalanceEl({ balance, onDelete, onEdit }) {
  const currentUser = useSelector((state) => state.currentUser.entities)

  function handleDelete() {
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

  function handleEdit() {
    onEdit(balance)
  }

  // function handleAddPreset() {
  // }

  return(
    <div className="BalanceEl Heading">
      <p>{balance.name}</p>
      <p>${balance.amount.toFixed(2)}</p>
      <div>
        {/* <Button onClick={handleAddPreset} variant="outlined" size="small" startIcon={<AddIcon />}>{`$${currentUser.preset}`}</Button> */}
        <IconBtn onClick={handleEdit} button="Edit" />
        <IconBtn onClick={handleDelete} button="Delete" />
      </div>
    </div>
  )
}

export default BalanceEl;