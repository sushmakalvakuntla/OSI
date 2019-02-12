# frozen_string_literal: true

module Elastic
  class AuditEventQueryBuilder
    include QueryBuilder
    def self.get_search(request)
      query(request[:query])
        .merge(paginate_query(request)).merge(sort_query)
    end

    def self.query(query)
      bool_and_query(query_leaves(query))
    end

    def self.paginate_query(query)
      {
        from: query[:from],
        size: query[:size]
      }
    end

    def self.query_leaves(query)
      query.map do |subquery|
        Elastic::QueryBuilder.subquery_as_es(subquery, SUBQUERIES)
      end.compact << ({ "match_phrase_prefix": { "event_source": 'CAP' } })
    end

    SUBQUERIES = {
      office_ids: ->(value) { { terms: { 'event.office_id.keyword': value } } unless value.empty? }
    }.freeze

    def self.sort_query
      { sort: [{ "timestamp": { order: 'desc' } },
               { "event.user_name.keyword": { order: 'desc' } }] }
    end

    def self.bool_and_query(query_leaves)
      {
        query: {
          bool: {
            must: query_leaves
          }
        }
      }
    end
  end
end
