# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe Elastic::UserQueryBuilder do
  let(:sort_score_and_name) do
    [{ "_score": 'desc' },
     { "last_name.for_sort": { "order": 'asc' } },
     { "first_name.for_sort": { "order": 'asc' } }]
  end

  describe '.get_search' do
    it 'processes enabled = false correctly' do
      expected_output = {
        query: {
          bool: {
            must: [
              { term: { 'enabled': 'false' } },
              { bool: {
                should: []
              } }
            ]
          }
        },
        from: 0,
        size: 10,
        sort: sort_score_and_name
      }
      input_query = {
        "query": [{ "field": 'enabled', "value": false }], "sort": [], "size": 10, "from": 0
      }
      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes the combination of last name and office parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'office_id.keyword': %w[north south east west] } },
              bool: {
                should: [
                  { match_phrase_prefix: { 'last_name': { "query": 'Smith', "boost": 3.0 } } }
                ]
              }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: sort_score_and_name
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes the combination case-insensitive racfid and case-insensitive email parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { match: { 'racfid.keyword': 'RACFID' } },
              { match: { 'email.keyword': 'example+john@example.com' } },
              bool: {
                should: []
              }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: sort_score_and_name
      }
      input_query = { "query": [{ "field": 'racfid', "value": 'RacfiD' },
                                { "field": 'email', "value": 'eXample+JOHN@example.com' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes the combination of last name, first name, email, racfid and office parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'office_id.keyword': %w[north south east west] } },
              { match: { 'email.keyword': 'example+john@example.com' } },
              { match: { 'racfid.keyword': 'RACFID' } },
              {
                bool: {
                  should: [
                    { match_phrase_prefix: { 'last_name': { "query": 'Smith', "boost": 3.0 } } },
                    { match_phrase_prefix: { 'first_name': 'John' } }
                  ]
                }
              }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'first_name', "value": 'John' },
                                { "field": 'office_ids', "value": %w[north south east west] },
                                { "field": 'email', "value": 'example+john@example.com' },
                                { "field": 'racfid', "value": 'RACFID' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end
    it 'processes the missing value parameters safely' do
      expected_output = {
        query: { match_all: {} },
        from: 0,
        size: 50,
        sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'last_name' },
                                { "field": 'first_name' },
                                { "field": 'office_ids' },
                                { "field": 'email' },
                                { "field": 'racfid'  }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes the combination of enabled and status parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { term: { 'enabled': 'true' } },
              { match_phrase_prefix: { 'status': 'CONFIRMED' } },
              { bool: {
                should: []
              } }

            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'enabled', "value": 'true' },
                                { "field": 'status', "value": 'CONFIRMED' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes the combination of enabled and locked parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { term: { 'enabled': 'false' } },
              { term: { 'locked': 'true' } },
              { bool: {
                should: []
              } }

            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'enabled', "value": 'false' },
                                { "field": 'locked', "value": 'true' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes the combination of enabled, locked and office parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { term: { 'enabled': 'false' } },
              { term: { 'locked': 'true' } },
              { terms: { 'office_id.keyword': %w[north south east west] } },
              { bool: {
                should: []
              } }

            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'enabled', "value": 'false' },
                                { "field": 'locked', "value": 'true' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes invalid search criteria by removing it' do
      expected_output = {
        query: {
          bool: {
            must: [
              bool: {
                should: [
                  { match_phrase_prefix: { 'last_name': { "query": 'Smith', "boost": 3.0 } } }
                ]
              }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'random', "value": 'guess' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.query' do
    it 'processes the search filter for last_name and office_ids' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'office_id.keyword': %w[north south east west] } },
              {
                bool: {
                  should: [
                    { match_phrase_prefix: { 'last_name': { "query": 'Smith', "boost": 3.0 } } }
                  ]
                }
              }
            ]
          }
        }
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }
      # input_query[:last_name] = 'Smith'
      # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

      output = Elastic::UserQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end

    it 'processes the search filter for last_name, office_ids, enabled-account-status' do
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'office_id.keyword': %w[north south east west] } },
              { term: { 'enabled': 'true' } },
              bool: {
                should: [
                  {
                    match_phrase_prefix: {
                      last_name: { query: 'Smith', boost: 3.0 }
                    }
                  }
                ]
              }
            ]
          }
        }
      }

      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] },
                                { "field": 'enabled', "value": true }],
                      "sort": [], "size": 50, "from": 0 }
      # input_query[:last_name] = 'Smith'
      # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

      output = Elastic::UserQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end

    it 'processes a set of empty filters as a match_all' do
      expected_output = {
        query: {
          match_all: {}
        }
      }
      input_query = { "query": [{ "field": 'last_name', "value": '' },
                                { "field": 'office_ids', "value": [] },
                                { "field": 'enabled', "value": '' }],
                      "sort": [], "size": 50, "from": 0 }
      # input_query[:last_name] = 'Smith'
      # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

      output = Elastic::UserQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end
  end

  it 'processes an empty set of filters as a match_all' do
    expected_output = {
      query: {
        match_all: {}
      }
    }
    input_query = { "query": [],
                    "sort": [], "size": 50, "from": 0 }
    # input_query[:last_name] = 'Smith'
    # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

    output = Elastic::UserQueryBuilder.query(input_query[:query])
    expect(output).to eq(expected_output)
  end

  describe '.get_count' do
    it 'process the query according to the input' do
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }
      expected_output = {
        query: {
          bool: {
            must: [
              { terms: { 'office_id.keyword': %w[north south east west] } },
              bool: {
                should: [
                  {
                    match_phrase_prefix: {
                      last_name: { query: 'Smith', boost: 3.0 }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
      output = Elastic::UserQueryBuilder.get_count(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.paginate_query' do
    it 'paginates according to the input' do
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }
      expected_output = { from: 0, size: 50 }
      output = Elastic::UserQueryBuilder.paginate_query(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.sort_query' do
    it 'sorts according to preset rules' do
      expected_output = { sort: sort_score_and_name }
      output = Elastic::UserQueryBuilder.sort_query
      expect(output).to eq(expected_output)
    end
  end
end
