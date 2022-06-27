class GoalsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

  def index
    goals = Goals.all
    render json: goals
  end

  def show
    goal = Goals.find(params[:id])
    render json: goal
  end

  def create
    # goal = Goal.create!(goal_params)
    goal = @current_user.goals.create!(goal_params)
    render json: goal, status: :created
  end

  # def update
  #   goal = @current_user.goals.find(params[:id])
  # end

  private

  def goal_params
    params.permit(:user_id, :balance_id, :item_id)
  end

end
