class AddPolymorphicCommentsTable < ActiveRecord::Migration
  def change
    create_table "comments", force: :cascade do |t|
      t.text       :body
      t.integer    :author_id
      t.references :commentable, polymorphic: true, index: true
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end
