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
    @response = Response.create(response_params)
    if @response 
      BuzonMailer.new_response(@response).deliver_later
      render json: @response
    else
      render json: @response.errors, status: :unprocessable_entity
    end
  end

  private
    def set_response
      @response = Response.find(params[:id])
    end

    def response_params
      params.require(:response).permit(:user_id, :post_id, :group_id, :body)
    end
end
