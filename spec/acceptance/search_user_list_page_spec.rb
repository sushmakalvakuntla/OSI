# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'faraday'

feature 'User List Page' do
  scenario 'Can log in' do
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    login
  end

  scenario 'page is accessible' do
    pending 'page has accessibility issues'
    login
    page_has_basic_text
    search_users(last_name: 'Nobody')
    click_add_user
    click_link 'User List'
    page_has_basic_text
    puts current_url
    sleep 5

    check_accessibility
  end

  # scenario 'validate user list page' do
  #   login
  #   sleep 2
  #   page_has_basic_text
  #   # page_has_user_list_headers
  #   search_users(last_name: 'Man')
  #   sleep 2
  #   first_count = page_count_users
  #   expect(first_count).to be > 0
  #   puts "count users #{first_count}"
  #   search_inactive_users

  #   user1_link = first_user_link
  #   # user2_link = second_user_link

  #   puts "We have two links:  #{user1_link.text} "

  #   # last_name = user2_link.text.match(/([^,]*),/)[1]
  #   # search_users(last_name: last_name)
  #   # FUTURE  we have no visible indicator that the search finished.
  #   # If we don't wait the list of users on the page may fail because
  #   # it is still changing users
  #   sleep 2
  #   expect_sorted_list(users_on_page)
  #   second_count = page_count_users

  #   expect(second_count).to be <= first_count
  #   puts "count users #{second_count}"
  # end

  scenario 'create user button is disabled before search and enabled after' do
    login
    undo_all_search
    check_the_button('CREATE A NEW USER', true)
    search_users(last_name: 'Man')
    check_the_button('CREATE A NEW USER', false)
  end

  scenario 'clear button clears all search' do
      login
      undo_all_search
      check_the_button('CLEAR', true)
      search_users(last_name: 'Man')
      check_the_button('CLEAR', false)
      click_button 'CLEAR'
      check_the_button('CLEAR', true)
    end
end
