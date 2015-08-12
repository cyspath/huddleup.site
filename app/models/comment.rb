class Comment < ActiveRecord::Base

  belongs_to :author, foreign_key: :author_id, class_name: User

  belongs_to :user

  belongs_to :group

  belongs_to :event

  validates :author, presence: true
end
