class Api::EventMembersController < ApplicationController

  def index
    @event_members = EventMember.all
    render json: @event_members
  end

  def show
    @event_member = EventMember.find(params[:id])
    render json: @event_member
  end

  def create
    @event_member = EventMember.new(event_member_params)
    if @event_member.save
      render json: @event_member
    else
      render json: @event_member.errors.full_messages, status: 422
    end
  end
  #
  # def update
  #   @event_member = EventMember.find(params[:id])
  #   if @event_member.update_attributes(event_member_params)
  #     render json: @event_member
  #   else
  #     render json: @event_member.errors.full_messages, status: 422
  #   end
  # end

  def destroy
    @event_member = EventMember.find(params[:id])
    @event_member.destroy if @event_member
    render json: {}
  end

  def event_member_params
    params.require(:event_member).permit(:user_id, :event_id)
  end
end
