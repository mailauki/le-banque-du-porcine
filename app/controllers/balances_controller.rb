class BalancesController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    # balances = Balance.all
    # balances = @current_user.balances
    if params[:user_id]
      user = User.find(params[:user_id])
      balances = user.balances
    else
      balances = Balance.all
    end
    render json: balances
  end

  def show
    balance = Balance.find(params[:id])
    render json: balance
  end

  def create
    balance = @current_user.balances.create!(balance_params)
    # balance = Balance.create!(balance_params)
    render json: balance, status: :created
  end

  def update
    balance = Balance.find(params[:id])
    balance.update!(balance_params)
    render json: balance
  end

  def destroy
    balance = Balance.find(params[:id])
    balance.destroy
    head :no_content
  end

  private

  def balance_params
    params.permit(:name, :amount, :wallet_id)
  end

end
