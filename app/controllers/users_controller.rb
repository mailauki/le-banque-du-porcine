class UsersController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create]

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find_by!(username: params[:username])
    render json: user
  end

  def me
    user = User.find_by!(id: session[:user_id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :first_name)
  end

end
