# frozen_string_literal: true

module AuditEvents
  class AuditEventRepository
    def initialize(http_service = Infrastructure::HttpService.new(
      Rails.configuration.micro_services['base_search_api_url']
    ))
      @http_search_service = http_service
    end

    def search(query, auth_header)
      response = @http_search_service.post(dora_path, query, auth_header)
      response.body
    end

    private

    def dora_path
      '/dora/auditevents/auditevent/_search'
    end
  end
end
