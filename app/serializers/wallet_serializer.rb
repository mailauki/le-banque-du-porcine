class WalletSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_balance
  
  def total_balance
    object.balances.map do |balance|
      balance.amount
    end.sum
  end

  has_many :balances
end
