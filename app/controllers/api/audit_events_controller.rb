# frozen_string_literal: true

require 'json'

module Api
  class AuditEventsController < ActionController::API
    def index
      q = allowed_params_to_search[:q]
      query = q ? JSON.parse(q, symbolize_names: true) : {}

      es_query_json = Elastic::AuditEventQueryBuilder.get_search(query)
      logger.debug "query audit events as #{JSON.generate(es_query_json)}"
      es_response = AuditEvents::AuditEventRepository.new.search(es_query_json, session[:token])

      audit_events_response = audit_events_response(es_response, query)
      render json: audit_events_response, status: :ok
    end

    private

    def audit_events_response(es_response, request_query)
      return { records: [], error: 'error processing query' } unless es_response.key?(:hits)

      audit_events = es_response[:hits][:hits].collect { |audit_event| audit_event[:_source] }
      total = es_response[:hits][:total]

      { records: audit_events, meta: { total: total, req: request_query } }
    end

    def allowed_params_to_search
      params.permit(:q)
    end
  end
end
