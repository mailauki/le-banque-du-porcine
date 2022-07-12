class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :total_balance, :total_cost, :total_percentage

  def total_balance
    @all_amounts = object.balances.map do |balance|
      balance.amount
    end if object.balances
    @all_amounts.sum
  end

  def total_cost
    @all_prices = object.items.map do |item|
      item.price
    end if object.items
    sprintf('%.2f', @all_prices.sum).to_f
  end

  def total_percentage
    (self.total_balance / self.total_cost * 100).round if self.total_balance && self.total_cost
  end

  has_many :balances
  has_many :items
end
