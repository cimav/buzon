class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    page = (params[:page] || 1).to_i
    posts = Post.order('id desc').page(page).per(10)
    render json: posts, meta: {total_pages: posts.total_pages}
  end

  def create
    render json: Post.create(post_params)
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
