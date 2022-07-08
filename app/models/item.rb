class Item < ApplicationRecord
  belongs_to :user
  has_many tags, through: :items_tags
end
