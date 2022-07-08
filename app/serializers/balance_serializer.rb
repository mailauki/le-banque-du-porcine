class BalanceSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount

  # belongs_to :user
end
