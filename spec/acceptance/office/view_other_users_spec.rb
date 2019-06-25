# frozen_string_literal: true
# can edit other office admins in the same office.
# can edit CWS worker IFF they are in the same office.
# can view county admin but not edit
# can view but not edit CWDS worker office admins IF they are in a different office same county.

# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'faraday'

feature 'Office admin security implications' do
  scenario 'can view and edit another office admin in the same office' do
    visit_home
    login
    clear_search # sets us to a search in the same office by default
    search_users_by_cws_login(cws_login: 'KENNEB')
    sleep 2
    page_exact_match_users[0].find('a').click
    expect(role_from_dropdown).to eq 'Office Administrator'
    page_is_user_details

    expect(page).to have_button('SAVE', disabled: true)
    fill_in('Email', with: 'dontsavethis@example.com', match: :prefer_exact)
    expect(page).to have_button('SAVE', disabled: false)
    # don't save. leave
    click_link 'User List'
  end

  scenario 'can edit CWS worker if they are in the same office' do
    visit_home
    login
    clear_search
    search_users_by_cws_login(cws_login: 'AUTO4I')
    page_exact_match_users[0].find('a').click
    page_is_user_details

    current_account = logged_in_user_info

    # office is the same as the logged in office admin.
    expect(detail_page_value('Office Name')).to eq current_account[:office_name]
    expect(role_from_dropdown).to eq 'CWS Worker'
    original_email_address = detail_page_input_value('Email')

    expect(page).to have_button('SAVE', disabled: true)

    fill_in('Email', with: 'nosave+' + original_email_address, match: :prefer_exact)
    expect(page).to have_button('SAVE', disabled: false)
    # don't save.
    click_link 'User List'
  end

  scenario 'can view county admin but not edit' do
    visit_home
    login
    clear_search
    # search for the user we log in as for county administration
    search_users_by_cws_login(cws_login: 'CWDSC')
    # remove my default selected office so I see other offices
    unselect_office(selected_offices[0])
    finished_loading
    page_exact_match_users[0].find('a').click
    page_is_user_details
    # check the text value -- not an input field because we can't edit.
    expect(detail_page_value('Email')).to_not be_blank
  end

  scenario 'can view office admin in other office, but not edit' do
    visit_home
    login
    clear_search
    # search for the user we log in as for county administration
    search_users_by_cws_login(cws_login: 'KNDYEB')
    # remove my default selected office so I see other offices
    unselect_office(selected_offices[0])
    finished_loading
    page_exact_match_users[0].find('a').click
    page_is_user_details
    # check the text value -- not an input field because we can't edit.
    expect(detail_page_value('Email')).to_not be_blank
  end
end
