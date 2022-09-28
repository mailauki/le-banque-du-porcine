import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { balanceAdded, balanceDeleted } from '../features/users/currentUserSlice';
import BalanceEl from './BalanceEl';
import IconBtn from './IconBtn';
import BalanceForm from './BalanceForm';
import { ClickAwayListener } from '@mui/material';

function Balances() {
  const [open, setOpen] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.entities)
  const dispatch = useDispatch()

  const { total_balance, balances } = currentUser

  function handleClick() {
    setOpen((prev) => !prev)
  }
  
  function handleClickAway() {
    setOpen(false)
  }

  function handleAdd(data) {
    dispatch(balanceAdded(data))
    setOpen(false)
  }

  function handleRemove(deletedBalance) {
    dispatch(balanceDeleted(deletedBalance))
  }

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="BalancesContainer box">
        {!open ? (
          <>
            <div className="Heading underline">
              <h4>Balances</h4>
              <p>{`Total: $${total_balance ? total_balance.toFixed(2) : 0}`}</p>
              <IconBtn onClick={handleClick} button="Add" />
            </div>
            <div className="Balances">
              {balances && balances.length > 0 ? (
                balances.map((balance) => (
                  <BalanceEl key={balance.id} balance={balance} onDelete={handleRemove} />
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <BalanceForm onSubmit={handleAdd} id={currentUser.id} />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Balances;