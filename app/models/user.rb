class User < ApplicationRecord
  has_many :progresses
  has_one :wallets
  has_many :lists
  
  has_secure_password
end
