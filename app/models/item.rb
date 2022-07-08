class Item < ApplicationRecord
  belongs_to :user
  belongs_to :balance
  # has_many tags, through: :item_tags
end
