class Response < ActiveRecord::Base
  belongs_to :post
  belongs_to :group
  belongs_to :user

  after_create :set_publish_date

  def set_publish_date
    self.publish_date = self.created_at
    self.save(:validate => false)
  end
end
