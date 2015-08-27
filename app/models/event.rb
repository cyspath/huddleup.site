class Event < ActiveRecord::Base

  default_scope { order('events.created_at') }

  has_many :event_members
  has_many :users, through: :event_members, source: :user

  belongs_to :author, foreign_key: :author_id, class_name: User

  belongs_to :group

  has_many :comments, as: :commentable

  has_many :images, as: :imageable

  validates :title, :author, :group_id, :date, :location, presence: true
end
