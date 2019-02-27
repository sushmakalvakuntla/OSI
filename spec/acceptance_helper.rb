# frozen_string_literal: true

require 'capybara'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'acceptance/support/login_helper'
require 'acceptance/support/user_list_page_helpers'
require 'acceptance/support/user_detail_page_helpers'
require 'selenium/webdriver'

# Capybara.register_driver :selenium do |app|
#   # browser_name = ENV['FIREFOX'] ? :firefox : :chrome
#   caps = Selenium::WebDriver::Remote::Capabilities.new(accept_insecure_certs: true)
#   Capybara::Selenium::Driver.new(app, browser: :firefox, desired_capabilities: caps)


#   # browser_options = Selenium::WebDriver::Firefox::Options.new()
#   # browser_options.args << '--headless'
#   # Capybara::Selenium::Driver.new(
#   #   app,
#   #   browser: :firefox,
#   #   options: browser_options
#   # )
# end
# Capybara.javascript_driver = :selenium


Capybara.register_driver :headless_firefox do |app|
  # browser_name = ENV['FIREFOX'] ? :firefox : :chrome
  # caps = Selenium::WebDriver::Remote::Capabilities.new(accept_insecure_certs: true)
  # Capybara::Selenium::Driver.new(app, browser: :browser_name, desired_capabilities: caps)


  browser_options = Selenium::WebDriver::Firefox::Options.new()
  Selenium::WebDriver.logger.level = :debug
  browser_options.args << '--headless'
  Capybara::Selenium::Driver.new(
    app,
    browser: :firefox,
    options: browser_options
  )
end

  Capybara.javascript_driver = :headless_firefox

def check_accessibility
  expect(page).to be_accessible
end

Capybara.configure do |config|
  include LoginHelper
  include UserListPageHelper
  include UserDetailPageHelper
  config.default_max_wait_time = 10
  config.default_driver = :selenium
  config.app_host = ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', 'http://localhost:3000')
  Capybara.save_path = 'tmp/capybara'
  Capybara::Screenshot.register_driver(:firefox_headless) do |driver, save_path|
    driver.browser.save_screenshot(save_path)
  end
  Capybara::Screenshot.register_filename_prefix_formatter(:rspec) do |example|
    "screenshot_#{example.description.tr(' ', '-').gsub(%r{^.*/spec/}, '')}"
  end
end
