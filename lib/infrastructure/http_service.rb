# frozen_string_literal: true

# rubocop:disable Style/OptionalArguments

require_relative './cap_faraday_middleware'

module Infrastructure
  class HttpService
    def initialize(base_url = Rails.configuration.micro_services['perry_api_base_url'])
      @base_url = base_url
    end

    def get(url, parameters = {}, token)
      http_connection.get("#{url}?#{parameters.to_query}&token=#{token}")
    end

    def post(url, parameters, token)
      http_connection.post do |request|
        request.url "#{url}?token=#{token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate(parameters)
      end
    end

    def put(url, parameters, token)
      http_connection.put do |request|
        request.url "#{url}?token=#{token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate(parameters)
      end
    end

    def patch(url, parameters, token)
      http_connection.patch do |request|
        request.url "#{url}?token=#{token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate(parameters)
      end
    end

    def delete(url, token)
      http_connection.delete do |request|
        request.url "#{url}?token=#{token}"
        request.headers['Content-Type'] = 'application/json'
      end
    end

    private

    def http_connection
      Faraday.new(url: @base_url) do |connection|
        connection.use CapFaradayMiddleware::ApiErrorException
        connection.response :json, parser_options: { symbolize_names: true }
        connection.adapter Faraday.default_adapter
      end
    end
  end
end
# rubocop:enable Style/OptionalArguments
