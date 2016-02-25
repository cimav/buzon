class User < ActiveRecord::Base
  belongs_to :group

  USER = 0
  ADMIN = 1

  def image_url
    "http://cimav.edu.mx/foto/#{email.split('@')[0]}/64"
  end

  def is_admin?
    is_admin == ADMIN
  end

end
