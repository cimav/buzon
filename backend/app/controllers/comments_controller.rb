class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  def create
    render json: Comment.create(comment_params)
  end

  def index
    comments = Comment.all
    render json: comments
  end

  def show
    render json: Comment.find(params[:id])
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:user_id, :post_id, :body)
    end
end
