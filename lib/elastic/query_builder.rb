# frozen_string_literal: true

module Elastic
  module QueryBuilder
    def self.subquery_as_es(subquery, known_subqueries)
      unless known_subqueries.key?(subquery[:field].to_sym)
        Rails.logger.debug("unrecognized query field (#{subquery[:field].to_sym})")
        return nil
      end
      known_subqueries.fetch(subquery[:field].to_sym).call(subquery[:value])
    end
  end
end
