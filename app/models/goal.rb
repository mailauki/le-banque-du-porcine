class Goal < ApplicationRecord
  # has_many :items
  # has_many :balances
  belongs_to :item
  belongs_to :balance
  belongs_to :user

  validates :balance_id, presence: true
end
