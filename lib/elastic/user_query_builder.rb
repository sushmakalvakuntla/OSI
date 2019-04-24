# frozen_string_literal: true

module Elastic
  class UserQueryBuilder
    include QueryBuilder
    def self.get_search(request)
      query(request[:query]).merge(paginate_query(request)).merge(sort_query)
    end

    def self.query(query)
      leaves = query_leaves(query)
      if leaves.blank?
        match_all
      else
        or_combined = bool_or_query(leaves)

        and_leaves = (leaves.select { |s| s[:conjunction] == 'AND' }).map { |s| s[:query] }
        and_leaves << or_combined

        bool_and_query(and_leaves)
      end
    end

    def self.paginate_query(query)
      {
        from: query[:from],
        size: query[:size]
      }
    end

    def self.missing(value)
      value.nil? || value == ''
    end

    def self.query_leaves(query)
      query.map do |subquery|
        Elastic::QueryBuilder.subquery_as_es(subquery, SUBQUERIES) unless missing(subquery[:value])
      end.compact
    end

    SUBQUERIES = {
      last_name: lambda do |value|
        unless value.empty?
          { conjunction: 'OR', query: {
            match_phrase_prefix: { last_name: { query: value, boost: 3.0 } }
          } }
        end
      end,
      first_name: lambda do |value|
        unless value.empty?
          { conjunction: 'OR', query: { match_phrase_prefix: { first_name: value } } }
        end
      end,
      office_ids: lambda do |value|
        { conjunction: 'AND', query: { terms: { 'office_id.keyword': value } } } unless value.empty?
      end,
      email: lambda do |value|
        { conjunction: 'AND', query: { match: { 'email.keyword': value.downcase } } } unless value
                                                                                             .empty?
      end,
      racfid: lambda do |value|
        { conjunction: 'AND', query: { match: { 'racfid.keyword': value.upcase } } } unless value
                                                                                            .empty?
      end,
      enabled: lambda do |value|
        { conjunction: 'AND', query: { term: { enabled: value.to_s } } } unless value.to_s.empty?
      end,
      locked: lambda do |value|
        { conjunction: 'AND', query: { term: { locked: value.to_s } } } unless value.to_s.empty?
      end,
      status: lambda do |value|
        unless value.empty?
          { conjunction: 'AND', query: { match_phrase_prefix: { status: value } } }
        end
      end
    }.freeze

    def self.sort_query
      { sort: [{ "_score": 'desc' }, { "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }] }
    end

    def self.bool_and_query(query_leaves)
      {
        query: { bool: { must: query_leaves } }
      }
    end

    def self.bool_or_query(leaves)
      or_leaves = leaves.select { |s| s[:conjunction] == 'OR' }
      query_leaves = or_leaves.map { |s| s[:query] }
      { bool: { should: query_leaves } }
    end

    def self.match_all
      { query: { match_all: {} } }
    end
  end
end
