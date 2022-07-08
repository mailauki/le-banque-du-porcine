class User < ApplicationRecord
  has_many :balances
  has_many :items

  validates :username, presence: true, uniqueness: true
  
  has_secure_password
end
