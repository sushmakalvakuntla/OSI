# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User Forgot Password Page' do
  before(:all) do
    logout_link
  end
  scenario 'click on forgot password link and submit email for resetting password' do
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    reset_password
    pending 'password reset threshold exceeded' if page.has_text? 'Attempt limit exceeded'
    expect(page).to have_text('Please check your email.')
  end

  scenario 'cancel from email submit page' do
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    click_button 'Cancel'
    expect(page).to have_text 'Log In'
  end

  scenario 'cancel from reset password page' do
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    reset_password
    pending 'password reset threshold exceeded' if page.has_text? 'Attempt limit exceeded'
    expect(page).to have_text('Please check your email.')
    click_button 'Cancel - Return to Login'
    expect(page).to have_text 'Log In'
  end

  scenario 'submit your email page has accessibility issues' do
    pending 'submit your email from forgot password has accessibility issues'
    click_forgot_password_link
    pending 'password reset threshold exceeded' if page.has_text? 'Attempt limit exceeded'
    expect(page).to have_text('Password Reset')
    check_accessibility
  end

  scenario 'reset your password page has accessibility issues' do
    click_forgot_password_link
    pending 'password reset threshold exceeded' if page.has_text? 'Attempt limit exceeded'
    expect(page).to have_text('Password Reset')
    reset_password

    pending 'password reset threshold exceeded' if page.has_text? 'Attempt limit exceeded'
    expect(page).to have_text('Please check your email.')
    check_accessibility
  end

  scenario 'Verify that MFA code does not expire after second attempt and user should be able to
  login successfully when providing valid value in second attempt' do
    session = Capybara::Session.new(:selenium)
    Capybara.using_session(session) do
      cognito_login
      invalid_mfa
      expect(page)
        .to have_text('Error. Incorrect code. You have 2 attempts remaining.')
      invalid_mfa
      expect(page)
        .to have_text('Error. Incorrect code. You have 1 attempt remaining.')
      verify_account
      # click on the link if we're on the dashboard
      go_manage_users if page.has_content?('Services & Resources')
      page_is_search
    end
    session.driver.browser.quit
  end
end
