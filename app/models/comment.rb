class Comment < ActiveRecord::Base

  default_scope { order('comments.created_at') }

  belongs_to :author, foreign_key: :author_id, class_name: User

  belongs_to :commentable, polymorphic: true

  validates :author, :body, presence: true
end
