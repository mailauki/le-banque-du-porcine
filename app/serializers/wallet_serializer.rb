class WalletSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_balance
  
  def total_balance
    object.balances.map do |balance|
      balance.amount
    end.sum if object.balances
  end

  has_many :balances
end
