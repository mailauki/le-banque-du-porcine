import Balances from './Balances';
import DeleteBtn from './DeleteBtn';

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
    <div className="WalletEl box">
      <div className="Heading underline">
        <p>{wallet.name}</p>
        <p>Total: ${parseFloat(wallet.total_balance).toFixed(2)}</p>
        {/* update total_balance when a balance is removed */}
        <DeleteBtn onClick={handleDelete} />
      </div>
      <Balances wallet={wallet} />
    </div>
  )
}

export default WalletEl;