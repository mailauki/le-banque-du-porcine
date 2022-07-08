class AddDetailsToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :user_id, :integer
    add_column :items, :priority, :integer
    add_column :items, :balance_id, :integer
  end
end
