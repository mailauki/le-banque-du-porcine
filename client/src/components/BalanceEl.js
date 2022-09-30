import IconBtn from './IconBtn';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function BalanceEl({ balance, onDelete, onEdit }) {
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

  function handleEdit() {
    onEdit(balance)
  }

  return(
    <div className="BalanceEl Heading">
      <p>{balance.name}</p>
      <p>${balance.amount.toFixed(2)}</p>
      <div>
        {/* <Button onClick={handleEdit} variant="outlined" size="small" startIcon={<AddIcon />}>$10</Button> */}
        <IconBtn onClick={handleEdit} button="Edit" />
        <IconBtn onClick={handleDelete} button="Delete" />
      </div>
    </div>
  )
}

export default BalanceEl;