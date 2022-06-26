class BalancesController < ApplicationController
  skip_before_action :authorize, only: [:index]

  def index
    balances = Balance.all
    render json: balances
  end

  def create
    # balance = @current_user.wallets.balances.create!(balance_params)
    balance = Balance.create!(balance_params)
    render json: balance, status: :created
  end

  private

  def balance_params
    params.permit(:name, :amount, :wallet_id)
  end

end
