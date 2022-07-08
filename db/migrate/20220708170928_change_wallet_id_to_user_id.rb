class ChangeWalletIdToUserId < ActiveRecord::Migration[7.0]
  def change
    remove_column :balances, :wallet_id, :integer
    add_column :balances, :user_id, :integer
  end
end
