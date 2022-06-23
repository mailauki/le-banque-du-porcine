class ListsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    lists = List.all
    render json: lists
  end

  def show
    list = List.find(params[:id])
    render json: list
  end

  def create
    list = List.create!(list_params)
    render json: list, status: :created
  end

  private

  def list_params
    params.permit(:name, :user_id)
  end

end
