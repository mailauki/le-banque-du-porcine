class Wallet < ApplicationRecord
  has_many :balances, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
end
