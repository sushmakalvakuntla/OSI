# frozen_string_literal: true

require 'rails_helper'

module Api
  describe UserDetailController do
    let(:user_repository) { instance_double('User::UserRepository') }
    let(:user) { Users::User.new(username: 'el') }
    let(:token) { 'my_token' }
    let(:error_response) { 'My default error response' }

    describe '#show' do
      it 'has a route' do
        expect(get: 'api/user_detail/12').to route_to(
          controller: 'api/user_detail',
          action: 'show',
          format: 'json',
          id: '12'
        )
      end

      it 'returns a userdetail' do
        allow(Users::UserRepository).to receive(:new)
          .with(no_args).and_return(user_repository)
        allow(user_repository).to receive(:get_users_details).with('12', 'token').and_return(user)
        request.session[:token] = 'token'
        get :show, params: { id: '12' }
        expect(response.body).to eq user.to_json
      end

      it 'rescues an exception' do
        allow(Users::UserRepository).to receive(:new).and_raise(ApiError)
        request.session[:token] = 'my_token'
        get :show, params: { id: '12' }
        expect(response.body).to eq error_response
      end
    end

    describe '#save_user' do
      it 'has a route' do
        expect(patch: 'api/user_detail/33/save_user').to route_to(
          format: 'json',
          controller: 'api/user_detail',
          action: 'save_user',
          id: '33'
        )
      end

      it 'updates a user' do
        allow(Users::UserRepository).to receive(:new).and_return(user_repository)
        allow(user_repository).to receive(:update_user)
          .with('55', { enabled: 'false',
                        phone_number: '4445558888',
                        phone_extension_number: '11',
                        permissions: %w[snapshot hotline],
                        email: 'abcd@gmail.com',
                        roles: %w[role1 role2] }, token)
          .and_return(user)
        request.session[:token] = 'my_token'
        patch :save_user, body: { enabled: 'false' },
                          params: { id: 55,
                                    enabled: 'false',
                                    phone_number: '4445558888',
                                    phone_extension_number: '11',
                                    permissions: %w[snapshot hotline],
                                    email: 'abcd@gmail.com',
                                    roles: %w[role1 role2] }
        expect(response.body).to eq user.to_json
      end

      it 'rescues an exception' do
        allow(Users::UserRepository).to receive(:new).and_raise(ApiError)
        request.session[:token] = 'my_token'
        patch :save_user, body: { enabled: 'false' },
                          params: { id: 55,
                                    enabled: 'false',
                                    permissions: %w[snapshot hotline] }
        expect(response.body).to eq error_response
      end
    end
  end
end
