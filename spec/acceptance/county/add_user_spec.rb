# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'Add User Page' do
  scenario 'entering valid info and completing the add' do
    login
    # Make sure there's no active existing user

    deactivate_any_active_added_user

    click_add_user

    email_address = new_email_address
    puts "New email address for completing an add #{email_address}"
    fill_in('Email', with: email_address, match: :prefer_exact)

    # now enter a valid RACFID valid
    valid_racfid = ENV.fetch('ADD_RACFID', 'AUTO1I').to_s

    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)

    verify_and_wait_to_complete

    expect(page).not_to have_selector('.alert-message')

    # we are now cleared to add the user.

    expect(page).to have_button('Add User')

    click_button 'Add User'
    # we need to sleep here or we may see a message not updated yet
    # referring to a previous user added in another step.
    sleep 5

    page.find('div.successMessage-customizable')
    expect(find(:label, 'CWS Login').find(:xpath, './/../span').text).to eq valid_racfid

    message = "Successfully added new user. Registration email has been sent to #{email_address}"
    expect(page.find('div.successMessage-customizable').text).to eq(message)

    puts "New user added #{current_url}"

    fill_in('Phone Number', with: '916-555-1111')
    click_on('RESEND INVITE')
    # changed field values are retained after submitting the resend.
    # also the phone number is reformatted to remove non-digits
    find_field('Phone Number', with: '9165551111')
    resend_registration_email_success
    expect(page).not_to have_content(message)
    expect(detail_page_value('User Status'))
      .to have_text('Registration Incomplete User has never logged in.')

    # Check for the changelog object.
    all('div', text: 'Change Log').last.click
    page.execute_script('window.scrollBy(0,10000)')
    # find the only event so far, the User Created event

    expect(find('div.audit-events').text).to match(/User Created/)
    # Deactivate this user so we can add him again using this process next time

    change_status 'Inactive'
    click_button 'SAVE'
  end

  scenario 'add user page is accessible' do
    pending 'add user validation has accessibility issues'
    login
    deactivate_any_active_added_user
    page_has_user_list_headers
    click_add_user
    email_address = new_email_address
    fill_in('Email', with: email_address, match: :prefer_exact)

    puts "Email address for add-user accessibility #{email_address}"
    # now enter a valid RACFID valid
    valid_racfid = ENV.fetch('ADD_RACFID', 'AUTO1I').to_s
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)

    check_accessibility
    verify_and_wait_to_complete
    check_accessibility
  end

  scenario 'entering invalid info and fixing it as we go' do
    login
    deactivate_any_active_added_user
    click_add_user

    expect(page).to have_content('Add User')
    expect(page).to have_content('Verify User')

    expect(page).to have_content('Enter the CWS Login and email address of the user ')
    expect(page).to have_button('Verify User', disabled: true)

    not_found_racfid = 'CWS_NOT_FOUND_RACFID'
    fill_in('CWS Login', with: not_found_racfid, match: :prefer_exact)
    fill_in('Email', with: 'cwds3raval', match: :prefer_exact)

    # bad email address won't let us proceed
    expect(page).to have_button('Verify User', disabled: true)
    expect(page).to have_content('Please enter a valid email.')

    # correct the email to a proper address
    email_address = new_email_address
    puts "Email address for add-user invalid-data testing #{email_address}"
    fill_in('Email', with: email_address, match: :prefer_exact)
    expect(page).to have_button('Verify User', disabled: false)

    verify_and_wait_to_fail 'No active user with CWS Login'

    # debugging:  this is a list of known racfids.  Some may be valid for our county, or not.
    # Keep this list around for future debugging purposes becsause the data is volatile.
    # find a racfid demonstrating wrong county:
    # ids %w[RUBBLBA CWSPC CWDST ELZIELA USERTF CWDS4 SMITHJP CAPPIR DEMUNP CWDS9 STEVEI CWDS3
    # TESTIB CWDS8 CWDS0 RUBBLB FLINTF GIDEOJ KONSI CHRISI TESTCC TESTCD CWDS2 CWSPD TESTPA SRINII
    # CHOUGA CWDS7 PADMAS TESTPC SCOGGMA CWDS5 GIDEOJA TAYLOVA HELPAA YEEI FAGUNBA CWDS6 LEGACT SIMK
    # CWDS1 YULLC TESTCE]
    #  ids.each do |id|
    # end

    click_button 'Verify User'

    unauthorized_racfid = ENV.fetch('WRONG_COUNTY_RACFID', 'AUTO1IA').to_s
    fill_in('CWS Login', with: unauthorized_racfid, match: :prefer_exact)

    verify_and_wait_to_fail('You cannot add this user because they exist in Madera county.')

    # now enter a valid RACFID valid
    valid_racfid = ENV.fetch('ADD_RACFID', 'AUTO1I').to_s
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)

    verify_and_wait_to_complete
    expect(page).to have_button('Add User')
    # We could click on the Add User button but then we'd have added the user.
    click_link 'User List'
    page_has_user_list_headers
  end
end
