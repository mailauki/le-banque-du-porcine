class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :total_balance, :total_cost

  # def total_balances
    # def all_amounts 
    #   object.balances.map do |balance|
    #     balance.amount
    #   end
    # end if object.balances

    # all_amounts = object.balances.map do |balance|
    #   balance.amount
    # end if object.balances

    # parseFloat(all_amounts.sum).toFixed(2) if all_amounts
  # end

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

  has_many :balances
  has_many :items
end
