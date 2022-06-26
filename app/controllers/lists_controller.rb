class ListsController < ApplicationController
  skip_before_action :authorize, only: [:show]

  def index
    # lists = List.all
    lists = @current_user.lists.all
    render json: lists
  end

  def show
    list = List.find(params[:id])
    render json: list
  end

  def create
    list = @current_user.lists.create!(list_params)
    # list = List.create!(list_params)
    render json: list, status: :created
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    head :no_content
  end

  private

  def list_params
    params.permit(:name, :user_id)
  end

end
