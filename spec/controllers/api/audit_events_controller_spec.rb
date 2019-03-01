# frozen_string_literal: true

require 'rails_helper'

module Api
  describe AuditEventsController do
    describe '#index' do
      let(:audit_event_repository) { instance_double('AuditEvent::AuditEventRepository') }
      let(:audit_event) do
        { event: { user_id: 'some_id', event_type: 'Some event' }, timestamp: 'now' }
      end
      let(:descending_timestamp) do
        [
          { "timestamp": { "order": 'desc' } },
          { "event.user_name.keyword": { "order": 'desc' } }
        ]
      end
      let(:events_repository) { instance_double('AuditEvent::AuditEventRepository') }
      let(:match_all_query) do
        { "query": {
          "bool": { "must": [
            { "match_phrase_prefix": { "event_source": 'CAP' } }
          ] }
        }, from: 51, size: 25,
          sort: descending_timestamp }
      end
      it 'has a route' do
        expect(get: 'api/audit_events').to route_to(
          controller: 'api/audit_events',
          action: 'index',
          format: 'json'
        )
      end

      describe 'get' do
        let(:partial_audit_event_response) do
          { records: [audit_event], meta: { total: 1, req: {} } }
        end

        it 'has a route' do
          expect(get: 'api/audit_events').to route_to(
            controller: 'api/audit_events',
            action: 'index',
            format: 'json'
          )
        end

        describe 'when an error is returned from ES' do
          let(:match_search_with_paging) do
            { query: [],
              from: 51, size: 25,
              sort: [{ field: 'timestamp', desc: true }] }
          end
          let(:api_response) { { "issue_details": 'something failed' } }

          it 'returns an empty list of audit events plus an error' do
            allow(AuditEvents::AuditEventRepository).to receive(:new)
              .with(no_args).and_return(audit_event_repository)

            allow(audit_event_repository)
              .to receive(:search).with(match_all_query, 'token')
                                  .and_return(api_response)
            request.session[:token] = 'token'

            error_response = { records: [], error: api_response }

            get :index, params: { q: match_search_with_paging.to_json }
            expect(JSON.parse(response.body, symbolize_names: true))
              .to eq error_response
          end
        end

        describe 'when no params are passed' do
          let(:match_search_with_paging) do
            { query: [],
              from: 51, size: 25,
              sort: [{ field: 'timestamp', desc: true }] }
          end
          let(:api_response) { { hits: { hits: [_source: audit_event], total: 1 } } }

          it 'returns a list of audit events' do
            allow(AuditEvents::AuditEventRepository).to receive(:new)
              .with(no_args).and_return(audit_event_repository)

            allow(audit_event_repository)
              .to receive(:search).with(match_all_query, 'token')
                                  .and_return(api_response)
            request.session[:token] = 'token'

            partial_audit_event_response[:meta] = { req: match_search_with_paging, total: 1 }
            get :index, params: { q: match_search_with_paging.to_json }
            expect(JSON.parse(response.body, symbolize_names: true))
              .to eq partial_audit_event_response
          end
        end

        describe 'when search params are passed' do
          let(:api_response) { { hits: { hits: [_source: audit_event], total: 1 } } }
          let(:match_office_id_with_paging) do
            { query: [{ field: 'office_ids', value: ['some_office_id'] }],
              from: 0, size: 50, sort: [{ timestamp: 'desc' }] }
          end
          let(:match_empty_office_id_with_paging) do
            { query: [{ field: 'office_ids', value: '' }],
              from: 51, size: 25,
              sort: [] }
          end

          before do
            allow(AuditEvents::AuditEventRepository).to receive(:new)
              .with(no_args).and_return(audit_event_repository)
            request.session[:token] = 'token'
          end

          it 'returns an event list / search limited by office id' do
            allow(audit_event_repository).to receive(:search).with(
              { query:
                { "bool":
                  { "must": [{ terms: { "event.office_id.keyword": ['some_office_id'] } },
                             { match_phrase_prefix: { "event_source": 'CAP' } }] } },
                from: 0, size: 50, sort: descending_timestamp }, 'token'
            ).and_return(api_response)

            partial_audit_event_response[:meta] =
              { req: match_office_id_with_paging, total: 1 }
            get :index, params: { q: match_office_id_with_paging.to_json }
            expect(JSON.parse(response.body, symbolize_names: true))
              .to eq partial_audit_event_response
          end
          it 'empty search params are ignored' do
            allow(audit_event_repository).to receive(:search).with(match_all_query, 'token')
                                                             .and_return(api_response)

            get :index, params: { q: match_empty_office_id_with_paging.to_json }
            partial_audit_event_response[:meta] =
              { req: match_empty_office_id_with_paging, total: 1 }
            expect(JSON.parse(response.body, symbolize_names: true))
              .to eq partial_audit_event_response
          end
        end
      end
    end
  end
end
