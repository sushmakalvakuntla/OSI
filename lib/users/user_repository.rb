# frozen_string_literal: true

module Users
  class UserRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_users(parameters, token)
      params = sanitize_keys(parameters)
      response = @http_service.get('/perry/idm/users', params, token)
      return [] if response.status == 404

      response.body.map { |result| User.new(result) }
    end

    def get_users_details(id, token)
      response = @http_service.get("/perry/idm/users/#{id}", token)
      Rails.logger.info "404 response from perry with token #{token}" if response.status == 404
      return {} if response.status == 404

      audit_events = get_user_audit_events(id, token)
      User.new(response.body.merge(auditevents: audit_events))
    end

    def update_user(id, parameters, token)
      response = @http_service.patch("/perry/idm/users/#{id}", parameters, token)
      User.new(response.body)
    end

    def verify_user(parameters, token)
      response = @http_service.get('/perry/idm/users/verify', parameters, token)
      return {} if response.status == 404

      VerifyUser.new(response.body)
    end

    def get_permissions_list(token)
      response = @http_service.get('/perry/idm/permissions', token)
      return [] if response.status == 404

      response.body { Permissions.new }
    end

    def get_offices_list(token)
      response = @http_service.get('/perry/idm/admin-offices', token)
      return [] if response.status == 404

      response.body { Offices.new }
    end

    def get_roles_list(token)
      response = @http_service.get('/perry/idm/roles', token)
      return [] if response.status == 404

      response.body { Roles.new }
    end

    def add_user(parameters, token)
      response = @http_service.post('/perry/idm/users', parameters, token)
      response.headers
    end

    def resend_registration_email(parameters, token)
      response = @http_service.post(
        "/perry/idm/users/#{parameters['id']}/registration-request", parameters,
        token
      )
      return response.status if response.status != 200

      ResendRegistration.new(response.body)
    end

    def self.search(query, auth_header)
      http_search_service = Infrastructure::HttpService.new(search_base_url)
      response = http_search_service.post('/dora/users/user/_search', query, auth_header)
      response.body
    end

    def self.search_base_url
      Rails.configuration.micro_services['base_search_api_url']
    end

    def get_user_audit_events(id, auth_header)
      http_search_service = Infrastructure::HttpService.new(UserRepository.search_base_url)
      response = http_search_service.post('/dora/auditevents/auditevent/_search',
                                          es_audit_events_by_id_query(id),
                                          auth_header)
      return {} if response.status == 404

      response.body[:hits][:hits].collect { |event| event[:_source] }
    end

    private

    def es_audit_events_by_id_query(id)
      {
        "query": {
          "bool": { "must": [
            { "match": { "event_source": 'CAP' } },
            { "match": { "event.user_id": id } }
          ] }
        },
        "from": 0, "size": 100,
        "sort": [{ "timestamp": { "order": 'desc' } }]
      }
    end

    def sanitize_keys(value)
      Hash[value.map do |k, v|
             [k.to_s.camelize(:lower), v]
           end
           ].delete_if { |_k, v| v == '' }
    end
  end
end
