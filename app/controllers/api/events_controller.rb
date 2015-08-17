class Api::EventsController < ApplicationController

  def index
    @events = Event.all
    render 'index'
  end

  def show
    @event = Event.find(params[:id])
    render 'show'
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update_attributes(event_params)
      render json: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy if @event
    render json: {}
  end

  def event_params
    params.require(:event).permit(:title, :location, :date, :body, :author_id, :group_id)
  end

end
