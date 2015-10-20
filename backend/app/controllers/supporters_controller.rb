class SupportersController < ApplicationController
  before_action :set_supporter, only: [:show, :edit, :update, :destroy]

  def index
    supporters = Supporter.all
    render json: supporters
  end

  def show
    render json: Supporter.find(params[:id])
  end

  def create
    p = supporter_params
    render json: Supporter.create(p)
  end

  def update
    render json: Supporter.find(params[:id]).tap { |b| b.update_attributes(supporter_params) }
  end

  def destroy
    render json: Supporter.find(params[:id]).destroy
  end

  private
    def set_supporter
      @supporter = Supporter.find(params[:id])
    end

    def supporter_params
      params.require(:supporter).permit(:post_id, :user_id)
    end
end
