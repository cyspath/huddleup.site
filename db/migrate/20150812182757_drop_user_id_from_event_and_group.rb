class DropUserIdFromEventAndGroup < ActiveRecord::Migration
  def change
    remove_column :groups, :user_id
    remove_column :events, :user_id
  end
end
