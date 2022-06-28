class GoalSerializer < ActiveModel::Serializer
  attributes :id, :item_id, :balance_id, :percentage

  def percentage
    object.balance.amount / object.item.price * 100 if object.balance && object.item
  end

  belongs_to :balance
  belongs_to :item
end
