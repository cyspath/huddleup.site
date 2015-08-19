class AddOrdToImages < ActiveRecord::Migration
  def change
    add_column :images, :ord, :integer
  end
end
