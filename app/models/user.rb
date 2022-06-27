class User < ApplicationRecord
  has_many :progresses
  has_many :goals
  has_many :wallets
  has_many :lists

  has_many :balances, through: :wallets
  has_many :items, through: :lists

  validates :username, presence: true, uniqueness: true
  
  has_secure_password
end
