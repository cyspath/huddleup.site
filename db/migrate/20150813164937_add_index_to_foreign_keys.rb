class AddIndexToForeignKeys < ActiveRecord::Migration
  def change
    add_index :event_members, :user_id
    add_index :event_members, :event_id
    add_index :comments, :author_id
    add_index :events, :author_id
    add_index :events, :group_id
    add_index :group_members, :user_id
    add_index :group_members, :group_id
    add_index :groups, :author_id
  end
end
