# frozen_string_literal: true

require 'rails_helper'

module Api
  describe SearchUserListController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::User.new(username: 'el') }
      let(:partial_user_response) do
        { records: [user.to_hash], meta: { total: 1, req: {} } }
      end

      let(:sort_score_and_name) do
        [{ "_score": 'desc' },
         { "last_name.for_sort": { "order": 'asc' } },
         { "first_name.for_sort": { "order": 'asc' } }]
      end

      let(:match_all_query) do
        { query: { match_all: {} }, from: 51, size: 25,
          sort: sort_score_and_name }
      end
      it 'has a route' do
        expect(get: 'api/search_user_list').to route_to(
          controller: 'api/search_user_list',
          action: 'index',
          format: 'json'
        )
      end

      describe 'when no params are passed' do
        let(:match_search_with_paging) do
          { query: [],
            from: 51, size: 25,
            sort: [{ field: 'last_name', desc: false }] }
        end
        let(:api_response) { { hits: { hits: [_source: user], total: 1 } } }

        it 'returns a userlist' do
          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)

          allow(Users::UserRepository).to receive(:search).with(match_all_query, 'token')
                                                          .and_return(api_response)
          request.session[:token] = 'token'

          partial_user_response[:meta] = { req: match_search_with_paging, total: 1 }
          get :index, params: { q: match_search_with_paging.to_json }
          expect(JSON.parse(response.body, symbolize_names: true)).to eq partial_user_response
        end
      end

      describe 'when search params are passed' do
        let(:api_response) { { hits: { hits: [_source: user], total: 1 } } }
        let(:match_last_name_with_paging) do
          { query: [{ field: 'last_name', value: 'Smith' }],
            from: 51, size: 25,
            sort: [] }
        end
        let(:match_empty_last_name_with_paging) do
          { query: [{ field: 'last_name', value: '' }],
            from: 51, size: 25,
            sort: [] }
        end

        before do
          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)
          request.session[:token] = 'token'
        end

        it 'returns a userlist / search limited by last_name' do
          allow(Users::UserRepository).to receive(:search).with(
            { query: {
              bool: {
                must: [
                  {
                    bool: {
                      should: [
                        { match_phrase_prefix: {
                          last_name: { boost: 3.0, query: 'Smith' }
                        } }
                      ]
                    }
                  }
                ]
              }
            },
              from: 51, size: 25, sort: sort_score_and_name }, 'token'
          ).and_return(api_response)

          partial_user_response[:meta] = { req: match_last_name_with_paging, total: 1 }
          get :index, params: { q: match_last_name_with_paging.to_json }
          expect(JSON.parse(response.body, symbolize_names: true)).to eq partial_user_response
        end
        it 'empty search params are ignored' do
          allow(Users::UserRepository).to receive(:search).with(match_all_query, 'token')
                                                          .and_return(api_response)

          get :index, params: { q: match_empty_last_name_with_paging.to_json }
          partial_user_response[:meta] = { req: match_empty_last_name_with_paging, total: 1 }
          expect(JSON.parse(response.body, symbolize_names: true)).to eq partial_user_response
        end

        describe 'when offices are specified' do
          let(:match_last_name_and_offices_with_paging) do
            { query: [
              { field: 'office_ids', value: [1, 2, 3] },
              { field: 'last_name', value: 'Smith' }
            ],
              from: 51, size: 25,
              sort: [] }
          end
          it 'returns a userlist / search limited by last_name AND the specified offices' do
            allow(Users::UserRepository).to receive(:search).with(
              { query: { "bool":
                         { "must": [
                           { terms: { "office_id.keyword": [1, 2, 3] } },
                           { bool:
                                { should:
                                  [{ match_phrase_prefix:
                                     { last_name: { boost: 3.0, query: 'Smith' } } }] } }
                         ] } },
                from: 51, size: 25, sort: sort_score_and_name }, 'token'
            ).and_return(api_response)
            partial_user_response[:meta] = { req: match_last_name_and_offices_with_paging,
                                             total: 1 }
            get :index, params: { q: match_last_name_and_offices_with_paging.to_json }
            expect(JSON.parse(response.body, symbolize_names: true)).to eq partial_user_response
          end
        end
      end
    end
    describe '#user_count' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::User.new(username: 'el') }
      let(:partial_user_response) do
        { meta: { total: 1 } }
      end

      let(:match_all_query) do
        { query: { match_all: {} } }
      end

      it 'has a route' do
        expect(get: 'api/users_list_count').to route_to(
          controller: 'api/search_user_list',
          action: 'users_list_count',
          format: 'json'
        )
      end

      describe 'when no params are passed' do
        let(:match_search) do
          { query: [] }
        end
        let(:api_response) do
          { count: 1, _shards: { total: 1, successful: 1, skipped: 0, failed: 0 } }
        end

        it 'returns a user list count' do
          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)

          allow(Users::UserRepository).to receive(:count).with(match_all_query, 'token')
                                                         .and_return(api_response)
          request.session[:token] = 'token'

          partial_user_response[:meta] = { total: 1 }
          get :users_list_count, params: { q: match_search.to_json }
          expect(JSON.parse(response.body, symbolize_names: true)).to eq partial_user_response
        end
      end

      describe 'when search params are passed' do
        let(:api_response) do
          { count: 1, _shards: { total: 1, successful: 1, skipped: 0, failed: 0 } }
        end
        let(:match_last_name) do
          { query: [{ field: 'last_name', value: 'Smith' }] }
        end
        let(:match_empty_last_name) do
          { query: [{ field: 'last_name', value: '' }] }
        end

        before do
          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)
          request.session[:token] = 'token'
        end

        it 'returns a userlist / search limited by last_name' do
          allow(Users::UserRepository).to receive(:count).with(
            { query: {
              bool: {
                must: [
                  {
                    bool: {
                      should: [
                        { match_phrase_prefix: {
                          last_name: { boost: 3.0, query: 'Smith' }
                        } }
                      ]
                    }
                  }
                ]
              }
            } }, 'token'
          ).and_return(api_response)

          partial_user_response[:meta] = { total: 1 }
          get :users_list_count, params: { q: match_last_name.to_json }
          expect(JSON.parse(response.body, symbolize_names: true)).to eq partial_user_response
        end
      end
    end
  end
end
