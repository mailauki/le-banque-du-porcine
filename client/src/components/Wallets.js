import { useEffect, useState } from 'react';
import WalletEl from './WalletEl';
import AddBtn from './AddBtn';
import AddWallet from './AddWallet';
import { ClickAwayListener } from '@mui/material';

function Wallets({user}) {
  const [wallets, setWallets] = useState([])
  const [open, setOpen] = useState(false)
  
  // useEffect(() => {
  //   if(user) {
  //     fetch(`/users/${user.id}/wallets`)
  //     .then((r) => r.json())
  //     .then((data) => setWallets(data))
  //   }
  // }, [user])

  function handleClick() {
    setOpen((prev) => !prev)
  }

  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(data) {
    setWallets([...wallets, data])
    setOpen(false)
  }

  function handleRemove(deletedWallet) {
    const updatedWallets = wallets.filter( wallet => {
      if(wallet.id !== deletedWallet.id) return wallet
    } )
    setWallets(updatedWallets)
  }

  return(
    user ? (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="WalletsContainer box">
          {!open ? (
            <>
              <div className="Heading">
                <h3>Wallets</h3>
                <AddBtn onClick={handleClick} />
              </div>
              <div className="Wallets">
                {/* {wallets.length > 0 ? (
                  wallets.map( wallet => (
                    <WalletEl key={wallet.id} wallet={wallet} onDelete={handleRemove} />
                  ) )
                ) : (
                  <></>
                )} */}
              </div>
            </>
          ) : (
            <AddWallet onSubmit={handleAdd} />
          )}
        </div>
      </ClickAwayListener>
    ) : (
      <></>
    )
  )
}

export default Wallets;