class ItemsController < ApplicationController
  skip_before_action :authorize, only: [:show]

  def index
    # items = Item.all
    # items = @current_user.lists.find(params[:list_id]).items.all
    if params[:user_id]
      user = User.find(params[:user_id])
      items = user.items
    else
      items = Item.all
    end
    render json: items
  end

  def show
    item = Item.find(params[:id])
    render json: item
  end

  def create
    item = @current_user.items.create!(item_params)
    # item = Item.create!(item_params)
    render json: item, status: :created
  end

  def update
    item = Item.find(params[:id])
    item.update!(item_params)
    render json: item
  end
  
  def destroy
    item = Item.find(params[:id])
    item.destroy
    head :no_content
  end

  private

  def item_params
    params.permit(:name, :price, :priority, :image, :user_id, :balance_id)
  end

end
