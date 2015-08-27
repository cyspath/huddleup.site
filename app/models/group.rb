class Group < ActiveRecord::Base
  default_scope { order('groups.name') }

  has_many :group_members
  has_many :users, through: :group_members, source: :user

  belongs_to :author, foreign_key: :author_id, class_name: User

  has_many :comments, as: :commentable

  has_many :images, as: :imageable

  has_many :events

  validates :name, :author, presence: true
end
