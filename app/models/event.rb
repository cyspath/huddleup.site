class Event < ActiveRecord::Base

  default_scope { order('events.created_at') }

  has_many :event_members
  has_many :users, through: :event_members, source: :user

  belongs_to :author, foreign_key: :author_id, class_name: User

  belongs_to :group

  has_many :comments, as: :commentable

  has_many :images, as: :imageable

  validates :title, :author, :group_id, :date, :location, presence: true

  validate :date_cannot_be_in_the_past

  belongs_to :patient


  def date_cannot_be_in_the_past
    if date <= Date.today
      errors.add(:date, "must be a future date")
    end
  end
end
