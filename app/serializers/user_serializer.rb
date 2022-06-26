class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name

  has_many :wallets
  has_many :lists
  has_many :balances, through: :wallets
end
