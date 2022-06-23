class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.integer :item_id
      t.integer :balance_id

      t.timestamps
    end
  end
end
