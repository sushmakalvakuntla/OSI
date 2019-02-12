# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe Elastic::QueryBuilder do
  describe '#subquery_as_es' do
    let(:subqueries) do
      {
        cannoli: ->(value) { value unless value.empty? }
      }.freeze
    end

    it 'processes a recognized subquery' do
      expect(Elastic::QueryBuilder.subquery_as_es(
               { field: 'cannoli', value: 'delicious' },
               subqueries
             )).to eq 'delicious'
    end

    it 'ignores an unrecognized subquery' do
      expect(Elastic::QueryBuilder.subquery_as_es({ field: 'gun', value: 'dangerous' }, subqueries))
        .to eq nil
    end
  end
end
