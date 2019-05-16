# frozen_string_literal: true

require 'faraday'
require 'acceptance_helper'
require 'feature'

feature 'Health Check' do
  scenario 'Health Check works' do
    raw = Faraday.get(ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', '') + '/system-information.json')
    response = JSON.parse(raw.body)
    expect(response['health_status']).to eq(true)
    expect(response['health_checks'].keys).to eq(%w[redis perry dora_api])
  end
end
