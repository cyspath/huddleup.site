class Api::RatingsController < ApplicationController
  def index
    @ratings = Rating.all
    render json: @ratings
  end

  def show
    @rating = Rating.find(params[:id])
    render json: @rating
  end

  def create
    @rating = Rating.new(rating_params)
    if @rating.save
      render json: @rating
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update_attributes(rating_params)
      render json: @rating
    else
      render json: @rating.errors.full_messages, status: 422
    end
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.destroy if @rating
    render json: {}
  end

  def rating_params
    params.require(:rating).permit(:voter_id, :rateable_id, :rateable_type, :score)
  end
  
end
