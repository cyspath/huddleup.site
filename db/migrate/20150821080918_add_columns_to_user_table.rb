class AddColumnsToUserTable < ActiveRecord::Migration
  def change
    add_column :users, :sex, :string
    add_column :users, :residence, :string
    add_column :users, :occupation, :string
    add_column :users, :age_preference, :string
    add_column :users, :interest_fact, :string

  end
end
