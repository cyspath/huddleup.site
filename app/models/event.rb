class Event < ActiveRecord::Base

  has_many :event_members
  has_many :users, through: :event_members, source: :user

  belongs_to :author, foreign_key: :author_id, class_name: User

  belongs_to :group

  has_many :comments, as: :commentable

  has_many :images, as: :imageable

  validates :title, :author, :group, :date, presence: true
end
