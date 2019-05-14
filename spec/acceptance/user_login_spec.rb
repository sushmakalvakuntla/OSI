# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User Sign in' do
  before(:each) do
    logout_link
  end

  scenario 'invalid login information throws an error message on the login screen' do
    cognito_invalid_login
    expect(page).to have_text('User does not exist.')
  end

  scenario 'Verify MFA page UI' do
    login_to_enter_mfa_page
    expect(page)
      .to have_css("img[src*='/CWS-CARES-tempLogo.png']")
    expect(page).to have_text('Account Verification Required')
    expect(page).to have_text('For additional security, we need to verify your account on this
      device.')
    expect(page).to have_text('An email was sent to')
    expect(page).to have_text('with a unique
      verification code. Please enter that code below.')
    expect(page).to have_text('Expires in:')
    expect(page).to have_text('Verification Code')
    expect(page).to have_button('Cancel', disabled: false)
    expect(page).to have_button('Verify', disabled: true)
    expect(page).to have_text('Not Working')
    expect(page).to have_button('Resend', disabled: false)
  end

  scenario 'invalid mfa code throws an error message on mfa screen' do
    # Verify first failure
    cognito_login_with_invalid_mfa
    sleep 2

    # Validate that focus is on Verification Code field when user input
    expect(page).to have_selector('#code:focus')

    expect(page).to have_button('Verify', disabled: true)
    expect(find_field('code').value.blank?).to be_truthy
    expect(page)
      .to have_text('Error. Incorrect code. You have 2 attempts remaining.')

    # Verify Second failure
    invalid_mfa
    sleep 2

    expect(page).to have_button('Verify', disabled: true)
    expect(find_field('code').value.blank?).to be_truthy
    expect(page)
      .to have_text('Error. Incorrect code. You have 1 attempt remaining.')

    # Verify third failure
    invalid_mfa

    # redirects back to login screen
    expect(page).to have_text('Log In')

    expect(find_field('email').value).to eq ENV.fetch('INVALID_MFA_USER',
                                                      'y_test111+role2@outlook.com')

    # Verify that previously input MFA code should not be retained,
    # if navigating back to MFA page after third failed attempt
    login_to_enter_mfa_page
    expect(find_field('code').value.blank?).to be_truthy
  end

  scenario 'Validate that VERIFY button in MFA page is disabled until user input MFA code' do
    login_to_enter_mfa_page
    expect(page).to have_button('Verify', disabled: true)
    fill_in 'Enter Code Here', with: 'someCode'
    expect(page).to have_button('Verify', disabled: false)
  end

  scenario 'Verify that user select cancel in MFA page and go to login page,
  and email address is preserved' do
    login_to_enter_mfa_page
    click_on 'Cancel'
    expect(page).to have_text('Log In')
    expect(find_field('email').value).to eq ENV.fetch('INVALID_MFA_USER',
                                                      'y_test111+role2@outlook.com')
  end

  scenario 'Verify that MFA code does not expire after first attempt and user should be able to
  login successfully when providing valid value in second attempt' do
    cognito_login
    invalid_mfa
    expect(page)
      .to have_text('Error. Incorrect code. You have 2 attempts remaining.')
    verify_account
    go_manage_users
    page_has_basic_text
  end

  scenario 'Verify that MFA code does not expire after second attempt and user should be able to
  login successfully when providing valid value in second attempt' do
    cognito_login
    invalid_mfa
    expect(page)
      .to have_text('Error. Incorrect code. You have 2 attempts remaining.')
    invalid_mfa
    expect(page)
      .to have_text('Error. Incorrect code. You have 1 attempt remaining.')
    verify_account
    go_manage_users
    page_has_basic_text
  end
end
