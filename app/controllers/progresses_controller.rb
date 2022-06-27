class ProgressesController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    progresses = Progress.all
    render json: progresses
  end

  def show
    progress = Progress.find(params[:id])
    render json: progress
  end

  def create
    # progress = @current_user.progresses.create!(progress_params)
    progress = @current_user.lists.find(params[:id]).progresses.create!(progress_params)
    # progress = Progress.create!(progress_params)
    render json: progress, status: :created
  end

  private

  def progress_params
    params.permit(:user_id, :wallet_id, :list_id)
  end

end
