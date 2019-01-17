# frozen_string_literal: true

module Api
  class UserDetailController < ActionController::API
    def show
      user_details = Users::UserRepository.new.get_users_details(params[:id], session[:token])
      render json: user_details
    rescue ApiError => e
      render json: e.response, status: e.status
    end

    def save_user
      user_params = Users::UserDetails.new(allowed_params_for_update).to_h.compact
      updated_user = Users::UserRepository.new.update_user(params[:id],
                                                           user_params, session[:token])
      render json: updated_user
    rescue ApiError => e
      render json: e.response, status: e.status
    end

    private

    def allowed_params_for_update
      params.permit(:phone_number,
                    :phone_extension_number,
                    :enabled,
                    :email,
                    permissions: [],
                    roles: []).to_h
    end
  end
end
