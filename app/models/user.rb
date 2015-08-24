class User < ActiveRecord::Base

  has_many :group_members
  has_many :groups, through: :group_members

  has_many :event_members
  has_many :events, through: :event_members

  has_many :comments, as: :commentable

  has_many :ratings, as: :rateable
  has_many :submitted_ratings, foreign_key: :voter_id, class_name: Rating

  has_many :images, as: :imageable

  has_many :authored_events, foreign_key: :author_id, class_name: Event

  has_many :authored_groups, foreign_key: :author_id, class_name: Group

  has_many :authored_comments, foreign_key: :author_id, class_name: Comment

  validates :username, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :sex, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
