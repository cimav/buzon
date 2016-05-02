class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    if params[:email] 
      users = User.where(email: params[:email])
    else
      users = User.all
    end
    render json: users
  end

  def show
    render json: User.find(params[:id])
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:group_id, :first_name, :last_name, :email, :reports_to, :start_date, :end_date, :status)
    end
end
