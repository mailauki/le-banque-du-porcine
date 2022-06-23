class WalletSerializer < ActiveModel::Serializer
  attributes :id, :balance_id, :user_id, :total_balance
  
  def total_balance
    object.balances.map( balance => balance.amount ).sum
  end

  has_many :balances
end
