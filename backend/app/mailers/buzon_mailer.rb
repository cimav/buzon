class BuzonMailer < ApplicationMailer
  
  def new_post(post)
    @post = post
    mail(to: @post.group.user.email, subject: "[#{@post.post_type.capitalize}] #{@post.subject}")
  end

  def reassign_post(post, new_group)
    @post = post
    @new_group = new_group
    mail(to: @new_group.user.email, subject: "[#{@post.post_type.capitalize}] #{@post.subject}")
  end

  def new_response(response)
    @post = response.post
    @response = response
    mail(to: @post.group.user.email, subject: "[Respuesta] #{@post.subject}")
  end

end
