class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price
  
  has_one :goal
end
