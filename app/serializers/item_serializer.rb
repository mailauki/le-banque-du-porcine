class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price

  # def percentage
  #   (object.balance.amount / object.item.price * 100).round if object.balance && object.item
  # end

end
