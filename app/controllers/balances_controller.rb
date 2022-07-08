class BalancesController < ApplicationController
  skip_before_action :authorize, only: [:show]

  def index
    # balances = Balance.all
    balances = @current_user.wallets.find(params[:wallet_id]).balances
    render json: balances
  end

  def show
    balance = Balance.find(params[:id])
    render json: balance
  end

  def create
    balance = @current_user.wallets.find(params[:wallet_id]).balances.create!(balance_params)
    balance = Balance.create!(balance_params)
    render json: balance, status: :created
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
