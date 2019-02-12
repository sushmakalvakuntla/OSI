# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe Elastic::AuditEventQueryBuilder do
  let(:match_all_cap_query) do
    { query: { bool: { must: [{ match_phrase_prefix: { event_source: 'CAP' } }] } } }
  end
  describe '.get_search' do
    it 'processes the combination of office parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'event.office_id.keyword': %w[north south east west] } },
              { match_phrase_prefix: { 'event_source': 'CAP' } }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "timestamp": { order: 'desc' } }, { "event.user_name.keyword": { order: 'desc' } }]
      }
      input_query = { "query": [
        { "field": 'office_ids', "value": %w[north south east west] }
      ],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::AuditEventQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes invalid search criteria by removing it' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'event.office_id.keyword': %w[north south east west] } },
              { match_phrase_prefix: { 'event_source': 'CAP' } }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "timestamp": { order: 'desc' } },
               { "event.user_name.keyword": { order: 'desc' } }]
      }
      input_query = { "query": [{ "field": 'office_ids', "value": %w[north south east west] },
                                { "field": 'random', "value": 'guess' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::AuditEventQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.query' do
    it 'processes the search filter for last_name and office_ids' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'event.office_id.keyword': %w[north south east west] } },
              { match_phrase_prefix: { 'event_source': 'CAP' } }
            ]
          }
        }
      }
      input_query = { "query": [{ "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::AuditEventQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end

    it 'processes the search filter for last_name, office_ids, enabled-account-status' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'event.office_id.keyword': %w[north south east west] } },
              { match_phrase_prefix: { 'event_source': 'CAP' } }
            ]
          }
        }
      }
      input_query = { "query": [{ "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::AuditEventQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end

    it 'processes a set of empty filters as a match of all for event_source CAP' do
      input_query = { "query": [
        { "field": 'office_ids', "value": [] }
      ],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::AuditEventQueryBuilder.query(input_query[:query])
      expect(output).to eq(match_all_cap_query)
    end
  end

  it 'processes an empty set of filters as a match only by event_source CAP' do
    input_query = { "query": [],
                    "sort": [], "size": 50, "from": 0 }

    output = Elastic::AuditEventQueryBuilder.query(input_query[:query])
    expect(output).to eq(match_all_cap_query)
  end

  describe '.paginate_query' do
    it 'paginates according to the input' do
      input_query = { "query": [
        { "field": 'office_ids', "value": %w[north south east west] }
      ],
                      "sort": [], "size": 50, "from": 0 }
      expected_output = { from: 0, size: 50 }
      output = Elastic::AuditEventQueryBuilder.paginate_query(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.sort_query' do
    it 'sorts according to preset rules' do
      expected_output = { sort: [{ "timestamp": { order: 'desc' } },
                                 { "event.user_name.keyword": { order: 'desc' } }] }
      output = Elastic::AuditEventQueryBuilder.sort_query
      expect(output).to eq(expected_output)
    end
  end
end
