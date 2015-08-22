class Rating < ActiveRecord::Base

  belongs_to :voter, foreign_key: :voter_id, class_name: User

  belongs_to :rateable, polymorphic: true

  validates :voter, :score, presence: true
end
