class Image < ActiveRecord::Base

  default_scope { order('images.created_at') }

  belongs_to :imageable, polymorphic: true

end
