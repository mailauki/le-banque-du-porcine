class User < ApplicationRecord
  has_many :progresses
  has_many :wallets
  has_many :lists

  validates :username, presence: true, uniqueness: true
  
  has_secure_password
end
