class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render 'index'
  end

  # def current
  #   @current_user = current_user
  #   render 'current'
  # end

  def show
    @user = User.find(params[:id])
    render 'show'
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :sex, :residence, :occupation, :age_preference, :interest_fact, :bio)
  end
end
