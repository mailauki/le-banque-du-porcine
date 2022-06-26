import { useEffect, useState } from 'react';
import WalletEl from './WalletEl';
import AddWallet from './AddWallet';
import IconButton from '@mui/material/IconButton';
import { Add } from '@mui/icons-material';

function Wallets({user}) {
  const [wallets, setWallets] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch("/wallets")
    .then((r) => r.json())
    .then((data) => setWallets(data))
  }, [])

  function handleAdd(data) {
    setWallets([...wallets, data])
    setIsEditing(false)
  }

  function handleDelete(deletedWallet) {
    const updatedWallets = wallets.filter( wallet => {
      if(wallet.id !== deletedWallet.id) return wallet
    } )
    setWallets(updatedWallets)
  }

  return(
    user ? (
      !isEditing ? (
        <div className="WalletsContainer box">
          <div className="Wallets">
            {wallets.map( wallet => (
              <WalletEl key={wallet.id} wallet={wallet} onDelete={handleDelete} />
            ) )}
          </div>
          <IconButton
            onClick={() => setIsEditing(true)}
            id="button"
            aria-label="add wallet"
            component="span"
            color="primary"
            sx={{
              // backgroundColor: "white",
              // color: "lightcoral",
              "&:hover": {
                backgroundColor: "#eee2",
                color: "#eee"
              }
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <AddWallet onSubmit={handleAdd} />
      )
    ) : (
      <></>
    )
  )
}

export default Wallets;