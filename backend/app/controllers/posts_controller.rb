class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    user = User.find(params[:user_id])
    page = (params[:page] || 1).to_i
    if (user.is_admin?)
      posts = Post.order('id desc').page(page).per(10)
    else
      posts = Post.where("post_type <> 'denuncia'").order('id desc').page(page).per(10)
    end
    render json: posts, meta: {total_pages: posts.total_pages}
  end

  def create
    @post = Post.create(post_params)
    if @post 
      BuzonMailer.new_post(@post).deliver_later
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: Post.find(params[:id])
  end

  def update
    render json: Post.find(params[:id]).tap { |b| b.update_attributes(post_params) }
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end
    def post_params
      params.require(:post).permit(:user_id, :group_id, :post_type, :subject, :body, :publish_date, :status)
    end
end
