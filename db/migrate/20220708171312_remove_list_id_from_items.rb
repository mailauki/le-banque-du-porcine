class RemoveListIdFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :list_id, :integer
  end
end
