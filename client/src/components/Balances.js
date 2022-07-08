import { useEffect, useState } from 'react';
import BalanceEl from './BalanceEl';
import AddBtn from './AddBtn';
import AddBalance from './AddBalance';
import { ClickAwayListener } from '@mui/material';

function Balances({user}) {
  const [balances, setBalances] = useState(user.balances)
  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   if(wallet) {
  //     fetch(`users/1/wallets/${wallet.id}/balances`)
  //     .then((r) => r.json())
  //     .then((data) => setBalances(data))
  //   }
  // }, [wallet])

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(data) {
    setBalances([...balances, data])
    setOpen(false)
  }

  function handleRemove(deletedBalance) {
    const updatedBalances = balances.filter( balance => {
      if(balance.id !== deletedBalance.id) return balance
    } )
    setBalances(updatedBalances)
  }

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="BalancesContainer box">
        {!open ? (
          <>
            <div className="Heading underline">
              <h4>Balances</h4>
              <p>{`Total: $${user.total_balance}`}</p>
              <AddBtn onClick={handleClick} />
            </div>
            <div className="Balances">
              {balances.length > 0 ? (
                balances.map( balance => (
                  <BalanceEl key={balance.id} balance={balance} onDelete={handleRemove} />
                ) )
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <AddBalance onSubmit={handleAdd} id={user.id} />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Balances;