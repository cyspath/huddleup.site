class AddColToImageTable < ActiveRecord::Migration
  def change
    add_column :images, :url_cropped, :string

  end
end
