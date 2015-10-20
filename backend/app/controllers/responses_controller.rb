class ResponsesController < ApplicationController
  before_action :set_response, only: [:show, :edit, :update, :destroy]

  def index
    responses = Response.all
    render json: responses
  end

  def show
    render json: Response.find(params[:id])
  end

  def create
    render json: Response.create(response_params)
  end

  private
    def set_response
      @response = Response.find(params[:id])
    end

    def response_params
      params.require(:response).permit(:user_id, :post_id, :group_id, :body)
    end
end
