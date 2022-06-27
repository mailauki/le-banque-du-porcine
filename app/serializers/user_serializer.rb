class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name

  has_many :wallets
  has_many :lists
  has_many :progresses
  has_many :goals
  has_many :balances, through: :wallets
  has_many :items, through: :lists
end
