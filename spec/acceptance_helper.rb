# frozen_string_literal: true

require 'capybara'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'acceptance/support/login_helper'
require 'acceptance/support/user_list_page_helpers'
require 'acceptance/support/user_detail_page_helpers'
require 'selenium/webdriver'
require 'chromedriver-helper'

if ENV['FIREFOX']
  Capybara.register_driver :selenium do |app|
    puts 'Running in FIREFOX'
    caps = Selenium::WebDriver::Remote::Capabilities.new(accept_insecure_certs: true)
    browser_options = Selenium::WebDriver::Firefox::Options.new
    browser_options.args << '--headless'
    Capybara::Selenium::Driver.new(app,
                                   browser: :firefox,
                                   options: browser_options,
                                   desired_capabilities: caps)
  end
else
  Capybara.register_driver :selenium do |app|
    puts 'Running in CHROME'
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end
  Capybara.javascript_driver = :selenium
end

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
  # Capybara::Screenshot.register_driver(:firefox_headless) do |driver, save_path|
  #   driver.browser.save_screenshot(save_path)
  # end
  Capybara::Screenshot.register_filename_prefix_formatter(:rspec) do |example|
    "screenshot_#{example.description.tr(' ', '-').gsub(%r{^.*/spec/}, '')}"
  end
end
