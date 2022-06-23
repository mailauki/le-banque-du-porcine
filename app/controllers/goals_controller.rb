class GoalsController < ApplicationController
  skip_before_action :authorize, only: [:index, :create]

  def index
    goals = Goals.all
    render json: goals
  end

  def create
    goal = Goal.create!(goal_params)
    render json: goal, status: :created
  end

  private

  def progress_params
    params.permit(:balance_id, :item_id)
  end

end
