class ItemsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    items = Item.all
    render json: items
  end

  def show
    item = Item.find(params[:id])
    render json: item
  end

  def create
    # item = @current_user.lists.items.create!(item_params)
    item = Item.create!(item_params)
    render json: item, status: :created
  end

  private

  def item_params
    params.permit(:name, :price)
  end

end
