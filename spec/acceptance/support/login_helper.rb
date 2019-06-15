# frozen_string_literal: true

module LoginHelper
  def login
    visit_home
    if page.has_content?('Authorization JSON')
      json_login
    else
      cognito_login_with_retry
      verify_account
      visit_home
    end

    go_manage_users if page.has_content?('Services & Resources')
  end

  def cognito_login_with_retry
    # our test environments can get stuck on a rate limit issue.
    #
    cognito_login
    sleep 2
    while page.text =~ /CreateAuthChallenge/
      puts "SLEEPING 10 seconds to get past 'CreateAuthChallenge' environment issue"
      sleep 10
      cognito_login
    end
  end

  def json_login(login_config = default_json)
    login_json = JSON.generate(login_config)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "ENV for county auth: #{ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', nil)}"
    puts "Logging in to county #{login_config[:county_name]}"

    puts "visited: landed on #{current_url}"

    submit_json_form(login_json) if page.has_content?('Authorization JSON')
  end

  def visit_home
    visit ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
  end

  def cognito_login
    visit_home
    return unless login_page?

    puts "Fill in user/pass with #{ENV.fetch('COGNITO_USERNAME', 'no-reply@osi.ca.gov')}, "\
         "#{ENV.fetch('COGNITO_PASSWORD', 'password')}"
    fill_in 'Email', with: ENV.fetch('COGNITO_USERNAME', 'no-reply@osi.ca.gov')
    fill_in 'Password', with: ENV.fetch('COGNITO_PASSWORD', 'password')
    click_on 'Sign In'
  end

  def cognito_invalid_login
    visit_home
    return unless login_page?

    fill_in 'Email', with: 'no-reply@osi.ca.gov'
    fill_in 'Password', with: 'password'
    click_on 'Sign In'
  end

  def cognito_login_with_invalid_mfa
    login_to_enter_mfa_page_with_retry
    invalid_mfa
  end

  def login_to_enter_mfa_page
    visit_home
    return unless login_page?

    fill_in 'Email', with: ENV.fetch('INVALID_MFA_USER', 'y_test111+role2@outlook.com')
    fill_in 'Password', with: ENV.fetch('INVALID_MFA_PASSWORD', 'Password123*')
    click_on 'Sign In'
  end

  def login_to_enter_mfa_page_with_retry
    # our test environments can get stuck on a rate limit issue.
    #
    login_to_enter_mfa_page
    sleep 2
    while page.text =~ /CreateAuthChallenge/
      puts "SLEEPING 10 seconds to get past 'CreateAuthChallenge' environment issue"
      sleep 10

      login_to_enter_mfa_page
      sleep 3
    end
  end

  def click_forgot_password_link
    visit_home
    return unless login_page?

    click_link 'Forgot your password?'
  end

  def login_page?
    page.has_content?('Log In')
  end

  def reset_password
    fill_in 'Email', with: 'y_test111+role1@outlook.com'
    click_button 'Reset my password'
  end

  def logout_link
    # ensure we're on an app page and not the login page, which the logout page won't work from
    visit_home
    visit "#{ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', '/')}/logout"
  end

  private

  def verify_account
    # verify via MFA using static value assigned to this user.
    return unless page.has_content?('Account Verification')

    fill_in 'code', with: 'LETMEIN'
    puts 'Successfully entered code'
    click_on 'Verify'
    expect(page).to have_content('Manage Users')
  end

  def invalid_mfa
    # verify via MFA using static value assigned to this user.
    return unless page.has_content?('Account Verification')

    fill_in 'Enter Code Here', with: 'LETMEI1'
    click_on 'Verify'
  end

  def go_manage_users
    first(:xpath, "//a[contains(@href, '/cap')]").click
    # reload the page.  Seems to overcome a problem with occasional container startup
    # not loading records at first.  To be explored.
    page.evaluate_script 'window.location.reload()'
  end

  def submit_json_form(login_json)
    return unless ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', false)

    fill_in 'Authorization JSON', with: login_json
    click_button 'Sign In'
    puts "signed in: #{current_url}"
  end

  def default_json
    {
      'user': 'RACFID',
      'staffId': 'aa1',
      'roles': ['State-admin'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Madera',
      'privileges': [
        'CWS Case Management System',
        'Resource Management',
        'Resource Mgmt Placement Facility Maint',
        'Sealed',
        'Sensitive Persons'
      ]
    }
  end

  def notice
    'Notice: This system is the property of the State of California and may be accessed
     only by authorized users.
     Unauthorized use of this system is strictly prohibited and may result in,
     but is not limited to, disciplinary action and criminal prosecution.
     The State of California may monitor any activity or communication on the
     system and retrieve any information stored within the system.
     By accessing and using this system, you are consenting to
     such monitoring and information retrieval for law enforcement and other purposes.
     Users have no expectation of privacy as to any communication on,
     or to any information stored within the system,
     or to any devices used to access this system.'
  end
end
