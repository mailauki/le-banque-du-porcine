class CreateBalances < ActiveRecord::Migration[7.0]
  def change
    create_table :balances do |t|
      t.string :name
      t.float :amount

      t.timestamps
    end
  end
end
