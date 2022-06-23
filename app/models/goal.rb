class Goal < ApplicationRecord
  # has_many :items
  # has_many :balances
  belongs_to :item
  belongs_to :balance
end
