# frozen_string_literal: true

module UserListPageHelper
  def click_add_user
    click_button 'CREATE A NEW USER'
  end

  def page_has_basic_text
    expect(page).to have_content('Search Existing User Accounts')
  end

  def page_has_user_list_headers
    expect(page.body).to match(
      /Manage Users.*County:.*Full Name.*Status.*Last Login.*CWS Login.*Office Name.*Role/
    )
  end

  def wait_for_load_complete
    load_msg = "//span[text()='Loading...']"
    expect(page).to have_no_selector(:xpath, load_msg) if page.all(:xpath, load_msg).count > 0
  end

  def page_count_users
    page.first('.card-body').all('.rt-tr-group a').count
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

  def expect_sorted_list(list)
    expect(list).to eq(list)
  end

  def users_on_page
    els = page.all('.rt-tr-group a').to_a
    els.map(&:text)
  end

  def first_user_link
    # first cell contains the link
    first_user.first.find('a')
  end

  def table_cells
    %i[full_name status last_log_in cws_login office_name role]
  end

  def first_user
    page.find('.card-body .rt-table').first('.rt-tr-group').all('.rt-td')
  end

  def second_user
    page.find('.card-body .rt-table').all('.rt-tr-group')[1].all('.rt-td')
  end

  def second_user_link
    second_user.first.find('a')
  end

  def text_values(user_row)
    user_hash = {}
    user_row.zip(table_cells) { |user_value, cell_name| user_hash[cell_name] = user_value.text }
    user_hash
  end

  def get_user_link(row_number)
    page.find('.card-body .rt-table').all('.rt-tr-group')[row_number].first('.rt-td > a')
  end

  def safe_fill_in_last_name(last_name)
    fill_in 'searchWithLastName', with: last_name
    last_name == '' ? force_change_script('#searchWithLastName', 'Search user list') : ''
  end

  def search_users(last_name: '', include_inactive: false)
    return if find_field('Last Name').value == last_name

    puts "search for '#{last_name}'"

    safe_fill_in_last_name(last_name)

    click_on 'SEARCH'
  end

  def search_inactive_users( include_inactive: false)
    include_inactive_label = page.find('label', text: 'Include Inactive')
    include_inactive_checkbox = include_inactive_label.sibling('input')

    if include_inactive_checkbox.checked? != include_inactive
      # clicking the inactive label performs a search
      include_inactive_label.click
    end
  end 

  def selected_offices
    offices = []
    all(:xpath,
        "//label[contains(text(),'Filter by Office Name')]/following-sibling::div/div/div/div")
      .to_a.each do |p|
      # don't return a value like "(13)" which means we've not picked yet
      offices << p.text unless p.text == '' || p.text == 'Select...' || p.text.match(/\([0-9]*\)/)
    end
    offices
  end

  def pick_single_office_name
    office_selectbox.click
    # choose the first office in the list.
    office_name = office_selectbox.find_by_id('react-select-2-option-0').text
    office_selectbox.find_by_id('react-select-2-option-0').click
    office_selectbox.click
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

  def search_by_office(office_name, last_name = '', include_inactive = false)
    # TODO: expand this to cover all three elements
    # return if find_field('Search user list').value == last_name

    puts "search for '#{office_name}'"

    safe_fill_in_last_name(last_name)

    select_office_by_name(office_name)

    include_inactive_label = page.find('label', text: 'Include Inactive')
    include_inactive_checkbox = include_inactive_label.sibling('input')

    if include_inactive_checkbox.checked? != include_inactive
      # clicking the inactive label performs a search
      include_inactive_label.click
    else
      click_on 'Search'
    end
  end

  def force_change_script(node_id, _node_label)
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

  def deactivate_any_active_added_user
    search_users(last_name: 'Auto')

    # wait for initial results
    page.find('.card-body .rt-table').first('.rt-tr-group')

    loop do
      puts 'get first active...'
      sleep 2
      active_row = first_active_user_on_page
      puts "returned from search for first #{active_row}  <<"
      deactivate_user active_row unless active_row.nil?
      if active_row.nil?
        break unless click_next
      end
    end
    puts 'done deactivating users'
  end

  def first_active_user_on_page
    find(:xpath, "//div[@class='pagination-top']")

    sleep 1
    puts "Scrolling page #{current_page_number} of #{total_pages}"

    active_count = page.all(:xpath,
                            "//div[@class='rt-tr-group']//div[contains(text(), 'Active')]/..").count

    puts "Searched for Active on this page.  Found #{active_count}"
    return nil if active_count == 0

    page.first(:xpath, "//div[@class='rt-tr-group']//div[contains(text(), 'Active')]/..")
  end

  def deactivate_user(active_row)
    active_row.find('a').click

    puts "Deactivating user #{current_url}"

    change_status 'Inactive'

    click_button 'SAVE'

    click_button 'Confirm' if has_button? 'Confirm'
    # wait for success message so we know the index has been updated, before
    # looking back at the user list again.
    expect_success
    sleep 3
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
end
