class WalletsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    wallets = Wallet.all
    render json: wallets
  end

  def show
    wallet = Wallet.find(params[:id])
    render json: wallet
  end

  def create
    # wallet = @current_user.wallets.create!(wallet_params)
    wallet = Wallet.create!(wallet_params)
    render json: wallet, status: :created
  end

  private

  def wallet_params
    params.permit(:user_id)
  end

end
