class DropProgresses < ActiveRecord::Migration[7.0]
  def change
    drop_table :progresses
  end
end
