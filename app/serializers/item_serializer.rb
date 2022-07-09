class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :priority, :percentage, :image

  def percentage
    (object.balance.amount / self.object.price * 100).round if object.balance && self.object.price
  end

  # belongs_to :user
  belongs_to :balance
end
