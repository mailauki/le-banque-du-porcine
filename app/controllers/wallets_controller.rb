class WalletsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    wallets = Wallet.all
    render json: wallets
  end

  def show
    wallet = Wallet.find(params[:id])
    render json: wallet
  end

  def create
    wallet = @current_user.wallets.create!(wallet_params)
    # wallet = Wallet.create!(wallet_params)
    render json: wallet, status: :created
  end

  def destroy
    wallet = Wallet.find(params[:id])
    wallet.destroy
    head :no_content
  end

  private

  def wallet_params
    params.permit(:user_id, :name)
  end

end
