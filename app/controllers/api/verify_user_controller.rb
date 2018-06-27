# frozen_string_literal: true

module Api
  class VerifyUserController < ActionController::API
    def index
      user_params = Users::User.new(allowed_params_to_verify).to_h.compact
      verify_user = Users::UserRepository.new.verify_user(user_params, session[:token])
      render json: verify_user
    end

    private

    def allowed_params_to_verify
      params.permit(:email, :racfid, :format).to_h
    end
  end
end
