import IconButton from '@mui/material/IconButton';
import { Clear } from '@mui/icons-material';

function WalletEl({wallet, onDelete}) {
  function handleDelete() {
    fetch(`/wallets/${wallet.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      onDelete(wallet)
    })
  }

  return(
    <div className="WalletEl">
        {wallet.name}
        <IconButton
          onClick={handleDelete}
          id="button"
          aria-label="delete wallet"
          component="span"
          color="primary"
          sx={{
            marginLeft: "10px",
            "&:hover": {
              backgroundColor: "#eee2",
              color: "#eee"
            }
          }}
        >
          <Clear fontSize="small" />
        </IconButton>
      </div>
  )
}

export default WalletEl;