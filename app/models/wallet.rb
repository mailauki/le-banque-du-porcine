class Wallet < ApplicationRecord
  has_many :balances
  belongs_to :user

  validates :name, presence: true
end
