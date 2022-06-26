class ListSerializer < ActiveModel::Serializer
  attributes :id, :name

  # def total_cost
  #   object.items.map( item => item.price ).sum
  # end

end
