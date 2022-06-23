class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :total_cost

  def total_cost
    object.items.map( item => item.price ).sum
  end

end
