# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'faraday'

feature 'State admin users' do
  scenario 'can view and edit another state admin' do
    visit_home
    login
    clear_search # sets us to a search in the same office by default
    search_users_by_email_address(email_address: 'kevin.fries@osi.ca.gov')
    finished_loading
    page_exact_match_users[0].find('a').click
    expect(role_from_dropdown).to eq 'State Administrator'
    page_is_user_details

    expect(page).to have_button('SAVE', disabled: true)
    fill_in('Email', with: 'dontsavethis@example.com', match: :prefer_exact)
    expect(page).to have_button('SAVE', disabled: false)

    # Ensure that the roles dropdown is not enabled since we
    expect(find('#RolesDropDown').first('input').disabled?).to be true

    # don't save. leave
    click_link 'User List'
  end

  scenario 'can edit county admin' do
    visit_home
    login
    clear_search
    # search for the user we log in as for county administration
    search_users_by_cws_login(cws_login: 'CWDSC')
    finished_loading
    first_user_link.click
    expect(role_from_dropdown).to eq 'County Administrator'
    expect(page).to have_button('SAVE', disabled: true)

    # can edit the county admin
    original_email_address = detail_page_input_value('Email')
    fill_in('Email', with: 'nosave+' + original_email_address, match: :prefer_exact)
    expect(page).to have_button('SAVE', disabled: false)

    # Can't change role to State Administrator
    expect(selectable_roles).not_to include('State Administrator')
    visit_home
  end

  scenario 'can edit office admin' do
    visit_home
    login
    clear_search
    # Pick an office admin user
    search_users_by_email_address(email_address: 'cals.test1+@gmail.com')
    finished_loading
    first_user_link.click
    sleep 2
    get_role = role_from_dropdown
    expect(get_role).to eq 'Office Administrator'
    expect(page).to have_button('SAVE', disabled: true)

    # can edit the office admin
    original_email_address = detail_page_input_value('Email')
    fill_in('Email', with: 'nosave+' + original_email_address, match: :prefer_exact)
    expect(page).to have_button('SAVE', disabled: false)

    # Can't change role to State Administrator
    expect(selectable_roles).not_to include('State Administrator')
    visit_home
  end

  scenario 'can not see Global admin users' do
    visit_home
    login
    clear_search
    # search for the user we log in as for county administration
    search_users_by_cws_login(cws_login: 'GLOBAV')

    expect(page_exact_match_users.count).to eq 0
    expect(page_fuzzy_match_users.count).to eq 0
  end
end
