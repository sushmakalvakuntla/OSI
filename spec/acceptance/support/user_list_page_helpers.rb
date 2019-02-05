# frozen_string_literal: true

module UserListPageHelper
  def click_add_user
    click_button '+ ADD A USER'
  end

  def page_has_basic_text
    expect(page).to have_content('County:')
  end

  def page_has_user_list_headers
    expect(page.body).to match(
      /Manage Users.*County:.*Full Name.*Status.*Last Login.*CWS Login.*Office Name.*Role/
    )
  end

  def page_count_users
    page.all('.rt-tr-group a').count
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
    page.find('.rt-table').first('.rt-tr-group').all('.rt-td')
  end

  def second_user
    page.find('.rt-table').all('.rt-tr-group')[1].all('.rt-td')
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
    page.find('.rt-table').all('.rt-tr-group')[row_number].first('.rt-td > a')
  end

  def safe_fill_in_last_name(last_name)
    fill_in 'searchLastName', with: last_name
    last_name == '' ? force_change_script('#searchLastName', 'Search user list') : ''
  end

  def search_users(last_name: '', include_inactive: false)
    return if find_field('Search user list').value == last_name

    puts "search for '#{last_name}'"

    safe_fill_in_last_name(last_name)

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
    page.find('.rt-table').first('.rt-tr-group')

    loop do
      puts 'get first active...'
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
      page.find('.rt-table').first('.rt-tr-group')
      puts 'next user list page'
      true
    else
      false
    end
  end

  def current_page_number
    find(:xpath, "//div[@class='pagination-top']//input").value.to_i
  end

  def total_pages
    find(:xpath, "//div[@class='pagination-top']//span[@class='-totalPages']").text.to_i
  end

  def has_more_pages?
    current_page_number < total_pages
  end
end
