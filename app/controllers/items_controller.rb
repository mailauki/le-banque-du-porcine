class ItemsController < ApplicationController
  skip_before_action :authorize, only: [:show]

  def index
    # items = Item.all
    items = @current_user.lists.find(params[:id]).items.all
    render json: items
  end

  def show
    item = Item.find(params[:id])
    render json: item
  end

  def create
    # item = @current_user.lists.items.create!(item_params)
    item = @current_user.lists.find(params[:id]).items.create!(item_params)
    # item = Item.create!(item_params)
    render json: item, status: :created
  end
  
  def destroy
    item = Item.find(params[:id])
    item.destroy
    head :no_content
  end

  private

  def item_params
    params.permit(:name, :price)
  end

end
