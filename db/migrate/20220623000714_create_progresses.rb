class CreateProgresses < ActiveRecord::Migration[7.0]
  def change
    create_table :progresses do |t|
      t.integer :user_id
      t.integer :goal_id

      t.timestamps
    end
  end
end
