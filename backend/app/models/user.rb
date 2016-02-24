class User < ActiveRecord::Base
  belongs_to :group

  def image_url
    "http://cimav.edu.mx/foto/#{email.split('@')[0]}/64"
  end

end
