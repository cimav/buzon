class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :edit, :update, :destroy]

  def index
    groups = Group.all
    render json: groups
  end

  def show
    render json: Group.find(params[:id])
  end

  private
    def set_group
      @group = Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:user_id, :name, :short_name, :is_department, :status)
    end
end
