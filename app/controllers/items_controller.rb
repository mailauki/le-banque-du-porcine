class ItemsController < ApplicationController
  skip_before_action :authorize, only: [:show]

  def index
    # items = Item.all
    # items = @current_user.lists.find(params[:list_id]).items.all
    if params[:list_id]
      list = List.find(params[:list_id])
      items = list.items
    else
      items = Item.all
    end
    render json: items
  end

  def show
    item = Item.find(params[:id])
    # list = @current_user.lists.find(params[:list_id])
    # item = list.items.find(params[:id])
    # item = @current_user.lists.find(params[:list_id]).items.find(params[:id])
    render json: item
  end

  def create
    # item = @current_user.lists.items.create!(item_params)
    item = @current_user.lists.find(params[:list_id]).items.create!(item_params)
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
