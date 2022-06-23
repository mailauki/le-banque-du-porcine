class Balance < ApplicationRecord
  # has_many :goals
  belongs_to :goal
  belongs_to :wallet
end
