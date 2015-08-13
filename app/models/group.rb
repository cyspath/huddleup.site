class Group < ActiveRecord::Base
  has_many :group_members
  has_many :users, through: :group_members, source: :user

  belongs_to :author, foreign_key: :author_id, class_name: User

  has_many :comments, as: :commentable

  has_many :events

  validates :name, :author, presence: true
end
