# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'faraday'
feature 'user list filters by office' do
  scenario 'Filter by office user list page' do
    login
    sleep 2
    search_users(last_name: 'A')
    wait_for_load_complete
    expand_changelog_component
    all_count_changelog = count_changelog_events

    all_users_count = page_exact_match_users.count
    office_name = 'CWDS CARES IM Lake Testing Office BinthuK2' # pick_single_office_name

    select_office_by_name(office_name)

    filtered_users_count = page_exact_match_users.count
    expand_changelog_component
    filtered_changelog_count = count_changelog_events
    puts "user counts: #{filtered_users_count} ?< #{all_users_count}"
    puts "changelog counts: #{filtered_changelog_count} ?< #{all_count_changelog}"

    expect(filtered_users_count).to be < all_users_count
    puts "Can't rely on filtered counts of changelog to be less than 100.  Make sure it's not more."
    expect(filtered_changelog_count).to be <= all_count_changelog
  end
end
