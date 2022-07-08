class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name

  # def total_balance
  #   object.balances.map do |balance|
  #     balance.amount
  #   end.sum if object.balances
  # end

  # def total_cost
  #   object.items.map do |item|
  #     item.price
  #   end.sum if object.items
  # end

  has_many :balances
  has_many :items
end
