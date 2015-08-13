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

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end
