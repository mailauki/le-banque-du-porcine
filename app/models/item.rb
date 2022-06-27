class Item < ApplicationRecord
  # belongs_to :goal
  belongs_to :list
  has_one :goal
end
