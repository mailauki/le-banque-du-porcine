import { useEffect, useState } from 'react';
import BalanceEl from './BalanceEl';
import AddBtn from './AddBtn';
import AddBalance from './AddBalance';
import { ClickAwayListener } from '@mui/material';

function Balances({wallet}) {
  const [balances, setBalances] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`/${wallet.id}/balances`)
    .then((r) => r.json())
    .then((data) => setBalances(data))
  }, [])

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
      <div className="BalancesContainer">
        {!open ? (
          <>
            <div className="Heading">
              <h4>Balances</h4>
              <AddBtn onClick={handleClick} />
            </div>
            <div className="Balances">
              {balances.map( balance => (
                <BalanceEl key={balance.id} balance={balance} onDelete={handleRemove} />
              ) )}
            </div>
          </>
        ) : (
          <AddBalance onSubmit={handleAdd} id={wallet.id} />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Balances;