# frozen_string_literal: true

require 'spec_helper'

module AuditEvents
  describe AuditEventRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:audit_event_repository) { AuditEventRepository.new(http_service) }
    let(:token) { 'sample_token' }
    let(:query) { 'my query' }
    describe '#search' do
      let(:good_response) { double(body: 'content') }
      before do
        allow(http_service).to receive(:post).with(
          '/dora/auditevents/auditevent/_search', query, token
        )
                                             .and_return(good_response)
      end
      it 'posts the given token to a search service' do
        expect(audit_event_repository.search('my query', token)).to eq('content')
      end
    end
  end
end
