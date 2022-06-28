class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_cost

  def total_cost
    object.items.map do |item|
      item.price
    end.sum if object.items
  end

end
