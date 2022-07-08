class DropWallets < ActiveRecord::Migration[7.0]
  def change
    drop_table :wallets
  end
end
