class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.string :location
      t.date :date
      t.text :body
      t.integer :author_id
      t.integer :group_id
      t.timestamps null: false
    end
  end
end
