class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
  #has_and_belongs_to_many :users_that_support, class_name: 'User' ,join_table: :supporters
  has_and_belongs_to_many :users, join_table: :supporters
  has_many :comments
  has_many :responses
  after_create :set_extra

  OPEN = 1
  CLOSED = 2


  def set_extra
    self.status = OPEN
    self.publish_date = self.created_at
    self.save(:validate => false)
  end
end
