# frozen_string_literal: true

require 'json'

module Api
  class SearchUserListController < ActionController::API
    def index_legacy
      params = Users::UserDetails.new(allowed_params_to_search).to_h.compact
      users = Users::UserRepository.new.get_users(params, session[:token])
      render json: users
    end

    def index
      query = parse_query
      es_query_json = Elastic::UserQueryBuilder.get_search(query)
      logger.debug "should be posted as #{JSON.generate(es_query_json)}"

      es_response = Users::UserRepository.search(es_query_json, session[:token])
      @users_response = user_response(es_response, query)
      render json: @users_response, status: :ok
    end

    def users_list_count
      query = parse_query
      es_query_json = Elastic::UserQueryBuilder.get_count(query)
      logger.debug "should be posted as #{JSON.generate(es_query_json)}"

      es_response = Users::UserRepository.count(es_query_json, session[:token])
      @users_count_response = users_count_response(es_response)
      render json: @users_count_response, status: :ok
    end

    private

    def parse_query
      q = allowed_params_to_search[:q]
      q ? JSON.parse(q, symbolize_names: true) : {}
    end

    def users_count_response(es_response)
      total = es_response[:count]
      { meta: { total: total } }
    end

    def user_response(es_response, request_query)
      users = es_response[:hits][:hits].collect { |user| user[:_source] }
      total = es_response[:hits][:total]

      { records: users, meta: { total: total, req: request_query } }
    end

    def allowed_params_to_search
      params.permit(:q)
    end
  end
end
