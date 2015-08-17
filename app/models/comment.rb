class Comment < ActiveRecord::Base

  belongs_to :author, foreign_key: :author_id, class_name: User

  belongs_to :commentable, polymorphic: true

  validates :author, :body, presence: true
end
