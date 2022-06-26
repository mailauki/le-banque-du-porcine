class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name

  has_many :wallets
  has_many :lists
end
