class Api::GroupMembersController < ApplicationController

  def index
    @group_members = GroupMember.all
    render json: @group_members
  end

  def show
    @group_member = GroupMember.find(params[:id])
    render json: @group_member
  end

  def create
    @group_member = GroupMember.new(group_member_params)
    if @group_member.save
      render json: @group_member
    else
      render json: @group_member.errors.full_messages, status: 422
    end
  end
  #
  # def update
  #   @group_member = GroupMember.find(params[:id])
  #   if @group_member.update_attributes(group_member_params)
  #     render json: @group_member
  #   else
  #     render json: @group_member.errors.full_messages, status: 422
  #   end
  # end

  def destroy
    @group_member = GroupMember.find(params[:id])
    @group_member.destroy if @group_member
    render json: {}
  end

  def group_member_params
    params.require(:group_member).permit(:user_id, :group_id)
  end

end
