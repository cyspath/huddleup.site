class AddThumbCropColToImageTable < ActiveRecord::Migration
  def change
    add_column :images, :thumb_url_cropped, :string

  end
end
