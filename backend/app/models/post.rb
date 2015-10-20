class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
  #has_and_belongs_to_many :users_that_support, class_name: 'User' ,join_table: :supporters
  has_and_belongs_to_many :users, join_table: :supporters
  has_many :comments
  has_many :responses
  after_create :set_publish_date

  def set_publish_date
    self.publish_date = self.created_at
    self.save(:validate => false)
  end
end
