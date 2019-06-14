# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User Sign in' do
  before(:each) do
    logout_link
    @session = Capybara::Session.new(:selenium)
  end

  after(:each) do
    @session.driver.browser.quit
  end
  scenario 'invalid login information throws an error message on the login screen' do
    cognito_invalid_login
    expect(page).to have_text('User does not exist.')
  end

  scenario 'Verify Login page UI' do
    visit_home

    expect(page)
      .to have_css("img[src*='/CWS-CARES-tempLogo.png']")
    expect(page).to have_text('Email')
    expect(page).to have_text('Password')
    expect(page).to have_field('Email', placeholder: 'Email')
    expect(page).to have_field('Password', placeholder: 'Password')
    expect(page).to have_link('Forgot your password?')
    expect(page).to have_button('Sign In', disabled: true)
    expect(page).to have_text(notice)
    fill_in 'Email', with: 'something@example.com'
    fill_in 'Password', with: 'Password'
    expect(page).to have_button('Sign In', disabled: false)
  end

  scenario 'Login, Logout and Login again using same MFA' do
    login
    logout_link
    expect(page).to have_text('Email')
    cognito_login_with_retry
    expect(page).not_to have_text('Account Verification Required')
    logout_link
  end

  scenario 'Verify MFA page UI' do
    Capybara.using_session(@session) do
      login_to_enter_mfa_page_with_retry
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
  end

  scenario 'invalid mfa code throws an error message on mfa screen' do
    Capybara.using_session(@session) do
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
      login_to_enter_mfa_page_with_retry

      expect(find_field('code').value.blank?).to be_truthy
      Capybara.current_session.driver.quit
    end
  end

  scenario 'Validate that VERIFY button in MFA page is disabled until user input MFA code' do
    Capybara.using_session(@session) do
      login_to_enter_mfa_page_with_retry
      expect(page).to have_button('Verify', disabled: true)
      fill_in 'Enter Code Here', with: 'someCode'
      expect(page).to have_button('Verify', disabled: false)
    end
  end

  scenario 'Verify that user select cancel in MFA page and go to login page,
  and email address is preserved' do
    Capybara.using_session(@session) do
      login_to_enter_mfa_page_with_retry
      click_on 'Cancel'
      expect(page).to have_text('Log In')
      expect(find_field('email').value).to eq ENV.fetch('INVALID_MFA_USER',
                                                        'y_test111+role2@outlook.com')
    end
  end

  scenario 'Verify that MFA code does not expire after first attempt and user should be able to
  login successfully when providing valid value in second attempt' do
    Capybara.using_session(@session) do
      logout_link
      cognito_login_with_retry
      invalid_mfa
      expect(page)
        .to have_text('Error. Incorrect code. You have 2 attempts remaining.')
      verify_account
      # click on the link if we're on the dashboard
      go_manage_users if page.has_content?('Services & Resources')
      page_is_search
    end
  end
end
