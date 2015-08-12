class EventMember < ActiveRecord::Base
  belongs_to :event
  belongs_to :user

  validates :user, :event, presence: true
end
