class GroupMember < ActiveRecord::Base

  belongs_to :user
  belongs_to :group


  validates :user, :group_id, presence: true
end
