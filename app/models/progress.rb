class Progress < ApplicationRecord
  has_many :goals
  belongs_to :user
end
