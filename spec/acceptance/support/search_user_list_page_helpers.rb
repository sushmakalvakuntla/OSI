# frozen_string_literal: true

module UserListPageHelper
  def click_add_user
    click_button 'CREATE A NEW USER'
  end

  def page_is_search
    expect(page).to have_content('Search Existing User Accounts')
  end

  def page_has_user_list_headers
    true
  end

  def wait_for_load_complete
    load_msg = "//span[text()='Loading...']"
    expect(page).to have_no_selector(:xpath, load_msg) if page.all(:xpath, load_msg).count > 0
  end

  def page_exact_match_users
    page.all('.exact-matches div.result-card')
  end

  def page_fuzzy_match_users
    page.all('.fuzzy-matches div.result-card')
  end

  def current_page_number
    find(:xpath, "//div[@class='pagination-top']//input").value.to_i
  end

  def total_pages
    find(:xpath, "//div[@class='pagination-top']//span[@class='-totalPages']").text.to_i
  end

  def jump_to_page(page_num)
    page_jumper = page.first('.-pageJump').find('input')
    page_jumper.set(page_num)
    page_jumper.send_keys(:enter)
    wait_for_load_complete
  end

  def total_count_users
    jump_to_page total_pages
    last_page_count = page_count_users
    (total_pages - 1) * 50 + last_page_count
  end

  # todo
  def count_changelog_events
    page.execute_script('window.scrollBy(0,1000000)')
    begin
      page.find('.audit-events').all('.rt-tr-group button').count
    rescue StandardError => e
      puts e
    end
  end

  def expand_changelog_component
    page.execute_script('window.scrollBy(0,1000000)')
    return if find(:xpath, './/*[@aria-expanded[string-length() != 0]]')['aria-expanded'] == 'true'

    all('div', text: 'Change Log').last.click
  end

  def clear_search
    visit_home
    page_is_search
    click_button 'CLEAR' if has_button? 'CLEAR'
  end

  def expect_sorted_list(list)
    expect(list).to eq(list)
  end

  def users_on_page
    els = page.all('.rt-tr-group a').to_a
    els.map(&:text)
  end

  def first_user_link
    # first cell contains the link
    first_user.find('a')
  end

  def table_cells
    %i[full_name status last_log_in cws_login office_name role]
  end

  def first_user
    if !page_exact_match_users.empty?
      page_exact_match_users[0]
    else
      page_fuzzy_match_users[0]
    end
  end

  def second_user
    page_exact_match_users[0]
  end

  def second_user_link
    second_user.first.find('a')
  end

  def text_values(user_row)
    user_hash = {}
    user_row.zip(table_cells) { |user_value, cell_name| user_hash[cell_name] = user_value.text }
    user_hash
  end

  def first_user_full_name
    first_name = first_user.find(:label, 'First Name').sibling('span').text
    last_name = first_user.find(:label, 'Last Name').sibling('span').text
    "#{last_name}, #{first_name}"
  end

  def safe_fill_in_last_name(last_name)
    fill_in 'searchWithLastName', with: last_name
    last_name == '' ? force_change_script('#searchWithLastName') : ''
  end

  def safe_fill_in_cws_login(cws_login)
    fill_in 'searchWithCWSLogin', with: cws_login
    cws_login == '' ? force_change_script('#searchWithCWSLogin') : ''
  end

  def safe_fill_in_email_address(email_address)
    fill_in 'searchWithEmail', with: email_address
    email_address == '' ? force_change_script('#searchWithEmail') : ''
  end

  def finished_loading
    sleep 1 # make sure the loading process has time to start
    expect(page).to have_no_css('.fa-circle-notch')
  end

  def logged_in_user_info
    new_window = window_opened_by { open_new_window }

    within_window new_window do
      clear_search
      fill_in 'searchWithEmail', with: ENV.fetch('COGNITO_USERNAME')
      click_button 'SEARCH'
      finished_loading
      page_exact_match_users[0].find('a').click
      account = account_from_details
      clear_search
      account
    end
  end

  def account_from_details
    {
      office_name: detail_page_value('Office Name'),
      cws_login: detail_page_value('CWS Login'),
      role: detail_page_value('Role')
    }
  end

  def search_users(last_name: '')
    clear_search
    return if find_field('Last Name').value == last_name

    puts "search for '#{last_name}'"
    safe_fill_in_last_name(last_name)
    body_element = page.find('#searchWithLastName')
    body_element.native.send_keys(:enter)
    finished_loading
  end

  def search_users_by_cws_login(cws_login: '')
    clear_search
    return if find_field('CWS Login').value == cws_login

    puts "search for RACFID '#{cws_login}'"
    safe_fill_in_cws_login(cws_login)
    body_element = page.find('#searchWithCWSLogin')
    body_element.native.send_keys(:enter)
    finished_loading
  end

  def search_users_by_email_address(email_address: '')
    clear_search
    return if find_field('Email').value == email_address

    puts "search for email '#{email_address}'"
    safe_fill_in_email_address(email_address)
    body_element = page.find('#searchWithEmail')
    body_element.native.send_keys(:enter)
    finished_loading
  end

  def show_inactive_users
    check 'Include Inactive', allow_label_click: true
  end

  def hide_inactive_users
    uncheck 'Include Inactive', allow_label_click: true
  end

  def selected_offices
    all(:xpath, '//*[@id="searchOfficeName"]/div/div')
      .map { |e| e.text unless e.text.match(/Filter by Office Name/) || e.text == '' }.compact!
  end

  def pick_single_office_name
    office_selectbox.click
    # choose the first office in the list.
    first_office = office_selectbox.first(:xpath, ".//div[@role='option']")

    office_name = first_office.text
    first_office.click
    office_name
  end

  def select_office_by_name(office_name)
    office_selectbox.click
    office_selectbox.first('div', text: office_name).click
  end

  def clear_offices_from_select
    selected_offices.each do |office|
      unselect_office(office)
    end
  end

  def office_selectbox
    page.find_by_id('searchOfficeName')
  end

  def unselect_office(office_name)
    return if office_name.blank?

    office_selectbox.find(:xpath,
                          "//*[contains(text(), '#{office_name}')]/following-sibling::*")
                    .click
  end

  def undo_all_search
    click_on 'CLEAR' if has_button? 'CLEAR'
  end

  def force_change_script(node_id)
    puts 'force change script to execute via keyboard send'
    find(node_id).send_keys('a')
    find(node_id).send_keys(:backspace)
    # execute_script "React.addons.TestUtils.Simulate.change(''#{node}'')"
  end

  def expect_valid_role(user_row)
    valid_roles = ['CWS Worker', 'County Administrator', 'CALS External Worker',
                   'State Administrator',
                   'Office Administrator']
    expect(valid_roles).to include user_row[:role]
  end

  def search_for_active_only_by_last_name(last_name)
    search_users(last_name: last_name)
    page.uncheck('Include Inactive', allow_label_click: true)
    # force a kind of refresh by checking and unchecking the
    # 'include inactive' checkbox.
    page.check('Include Inactive', allow_label_click: true)
    page.uncheck('Include Inactive', allow_label_click: true)
    sleep 1
    # maybe look for the loading icon to have gone away.  'svg[data-icon="circle-notch"]'
  end

  def deactivate_any_active_added_user
    search_for_active_only_by_last_name 'Auto1Lake'
    # wait for initial results
    sleep 1

    loop do
      active_row = page_exact_match_users[0]

      puts "returned from search for first #{active_row}  <<"

      deactivate_user active_row
      break if active_row.nil?

      search_for_active_only_by_last_name 'Auto1Lake'
      sleep 2
    end
    puts 'done deactivating users'
  end

  def first_active_user_on_page
    active_count = page.all(:xpath,
                            "//div[@class='rt-tr-group']//div[contains(text(), 'Active')]/..").count

    puts "Searched for Active on this page.  Found #{active_count}"
    return nil if active_count == 0

    page.first(:xpath, "//div[@class='rt-tr-group']//div[contains(text(), 'Active')]/..")
  end

  def deactivate_user(active_row)
    return if active_row.nil?

    active_row.find('a').click

    puts "Deactivating user #{current_url}"
    change_status 'Inactive'
    sleep 2
    save_and_confirm
    click_on 'User List'
  end

  def click_next
    if has_more_pages?
      top_nav = find(:xpath, "//div[@class='pagination-top']")
      top_nav.find('.-next').find('button').find('span').click
      page.find('.card-body .rt-table').first('.rt-tr-group')
      puts 'next user list page'
      true
    else
      false
    end
  end

  def change_log
    all('div', text: 'Change Log').last.click
    # Check for the changelog object.
    all('div', text: 'Change Log').last.click
    page.execute_script('window.scrollBy(0,10000)')
    # find the only event so far, the User Created event

    expect(find('div.audit-events').text).to match(/User Created/)
  end

  def has_more_pages?
    current_page_number < total_pages
  end

  def check_the_button(button_name, disabled_status)
    puts "checking '#{button_name}' button for '#{disabled_status}' status"
    expect(page).to have_button(button_name, disabled: disabled_status)
  end
end
