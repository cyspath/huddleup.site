class Api::ImagesController < ApplicationController
  def index
    render json: Image.all.to_json
  end

  def create
    image = Image.new(image_params)
    if image.save
      render json: image
    else
      render json: {message: 'failure'}, status: 422
    end
  end

  def show
    render json: Image.find(params[:id])
  end

  def destroy
    image = Image.find(params[:id])
    image.destroy if image
    render json: {}
  end

  private
  def image_params
    params.require(:image).permit(:url, :thumb_url, :imageable_type, :imageable_id)
  end
end
