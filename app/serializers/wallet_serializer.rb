class WalletSerializer < ActiveModel::Serializer
  attributes :id, :name
  
  # def total_balance
  #   object.balances.map( balance => balance.amount ).sum
  # end

  # has_many :balances
end
