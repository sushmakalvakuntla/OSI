# frozen_string_literal: true

require 'spec_helper'

module Users
  describe UserRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:user_repository) { UserRepository.new(http_service) }
    let(:token) { 'sample_token' }
    let(:params) { { 'lastName' => 'pop', 'id' => 'SOME_ID' } }

    describe '#get_users' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no user' do
        it 'returns an empty user' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.get_users(params, token)).to eq([])
        end
      end

      context 'with users' do
        let(:parameter) { { 'lastName' => '' } }
        it 'returns users without params' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return([{ username: 'El' }])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', {}, token)
            .and_return(response)
          expect(user_repository.get_users(parameter, token)).to eq [User.new(username: 'El')]
        end
      end

      context 'with a user' do
        it 'returns a user' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return([{ username: 'El' }])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.get_users(params, token))
            .to eq [User.new(username: 'El')]
        end
      end
    end

    describe '#get_users_details' do
      let(:response) { instance_double('Faraday::Response') }
      let(:es_response) { instance_double('Faraday::Response') }

      context 'with no user' do
        it 'returns an empty user_detail' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/22', token)
            .and_return(response)
          expect(user_repository.get_users_details('22', token)).to eq({})
        end
      end

      context 'with a user' do
        it 'returns a user_detail' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(id: 'El')
          allow(es_response).to receive(:body).and_return(id: 'El')
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/33', token)
            .and_return(response)
          expect(user_repository.get_users_details('33', token))
            .to eq User.new(id: 'El')
        end
      end
    end

    describe '#get_permissions_list' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no permissions' do
        it 'returns an empty permissions list' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/permissions', token)
            .and_return(response)
          expect(user_repository.get_permissions_list(token)).to eq([])
        end
      end

      context 'with a list' do
        it 'returns a permissions list' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(['el'])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/permissions', token)
            .and_return(response)
          expect(user_repository.get_permissions_list(token))
            .to eq ['el']
        end
      end
    end

    describe '#get_roles_list' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no roles' do
        it 'returns an empty roles list' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/roles', token)
            .and_return(response)
          expect(user_repository.get_roles_list(token))
            .to eq([])
        end
      end

      context 'with a list' do
        it 'returns a roles list' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(%w[user admin])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/roles', token)
            .and_return(response)
          expect(user_repository.get_roles_list(token))
            .to eq %w[user admin]
        end
      end
    end

    describe '#get_offices_list' do
      let(:response) { instance_double('Faraday::Response') }
      context 'with no offices' do
        it 'returns an empty offices list' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/admin-offices', token)
            .and_return(response)
          expect(user_repository.get_offices_list(token)).to eq([])
        end
      end
      context 'with a list' do
        it 'returns a offices list' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(['el'])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/admin-offices', token)
            .and_return(response)
          expect(user_repository.get_offices_list(token))
            .to eq ['el']
        end
      end
    end

    describe '#update_user' do
      let(:response) { instance_double('Faraday::Response') }
      params = {
        enable: 'true',
        permissions: %w[snapshot hotline]
      }

      context 'with user' do
        it 'updates a user' do
          allow(response).to receive(:body).and_return(
            id: '55',
            enabled: 'true',
            permissions: %w[snapshot hotline]
          )
          allow(http_service)
            .to receive(:patch)
            .with('/perry/idm/users/55', params, token)
            .and_return(response)
          expect(user_repository.update_user('55', params, token))
            .to eq User.new(id: '55', enabled: 'true', permissions: %w[snapshot hotline])
        end
      end
    end

    describe '#resend_registration_email' do
      let(:response) { instance_double('Faraday::Response') }
      context 'with user' do
        it 'returns status as 200' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(
            user_id: 'SOME_ID'
          )
          allow(http_service)
            .to receive(:post)
            .with("/perry/idm/users/#{params['id']}/registration-request", params, token)
            .and_return(response)
          expect(user_repository.resend_registration_email(params, token))
            .to eq ResendRegistration.new(
              user_id: 'SOME_ID'
            )
        end
      end
      context 'with no user' do
        it 'returns an empty user_detail' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:post)
            .with("/perry/idm/users/#{params['id']}/registration-request", params, token)
            .and_return(response)
          expect(user_repository.resend_registration_email(params, token))
            .to eq 404
        end
      end
    end

    describe '#verify_user' do
      let(:response) { instance_double('Faraday::Response') }
      params = {
        RACFID: 'true',
        email: 'verifyme@gmail.com'
      }

      context 'with no data' do
        it 'returns an empty response' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/verify', params, token)
            .and_return(response)
          expect(user_repository.verify_user(params, token)).to eq({})
        end
      end

      context 'verify a user' do
        it 'returns a response' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body)
            .and_return(verification_passed: 'True', verification_message: 'No user')
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/verify', params, token)
            .and_return(response)
          expect(user_repository.verify_user(params, token))
            .to eq VerifyUser.new(verification_passed: 'True', verification_message: 'No user')
        end
      end
    end

    describe '#add_user' do
      let(:response) { instance_double('Faraday::Response') }
      let(:location) { 'http://www.google.com/assnlk123-afdb1324-we132' }
      params = {
        enable: 'true',
        permissions: %w[snapshot hotline]
      }

      context 'with user' do
        it 'add user' do
          allow(response).to receive(:headers).and_return(location)
          allow(http_service)
            .to receive(:post)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.add_user(params, token))
            .to eq 'http://www.google.com/assnlk123-afdb1324-we132'
        end
      end
    end

    describe '#delete_user_lock' do
      let(:response) { instance_double('Faraday::Response') }
      context 'with user' do
        it 'returns status as 204' do
          allow(response).to receive(:status).and_return(204)
          allow(http_service)
            .to receive(:delete)
            .with('/perry/idm/users/55/lock', token)
            .and_return(response)
          expect(user_repository.delete_user_lock(55, token))
            .to eq 204
        end
      end
    end
  end

  describe '.search' do
    let(:search_server) { Infrastructure::HttpService.new('http://stub.example.com') }
    let(:good_response) { double(body: 'content') }
    let(:token) { 'token' }
    before do
      allow(search_server).to receive(:post).with('/dora/users/user/_search', 'my query', token)
                                            .and_return(good_response)
      allow(Infrastructure::HttpService).to receive(:new).with('https://dora.test')
                                                         .and_return(search_server)
    end
    it 'posts the given token to a search service' do
      expect(UserRepository.search('my query', 'token')).to eq('content')
    end
  end
end
