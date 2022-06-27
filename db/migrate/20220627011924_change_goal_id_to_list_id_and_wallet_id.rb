class ChangeGoalIdToListIdAndWalletId < ActiveRecord::Migration[7.0]
  def change
    remove_column :progresses, :goal_id, :integer
    add_column :progresses, :list_id, :integer
    add_column :progresses, :wallet_id, :integer
  end
end
