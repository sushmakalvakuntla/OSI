# frozen_string_literal: true

module UserDetailPageHelper
  def page_is_user_details
    # find forces a wait for the content to appear, while the expect does not.
    find('h1', text: 'User Profile')
    expect(page).to have_content('User Profile')
  end

  def selected_permissions
    permissions = []
    all(:xpath,
        "//label[contains(text(),'Assigned Permissions')]/following-sibling::div/div/div/div")
      .to_a.each do |p|
      # skip empty, preview and nodes with the role of 'option' -- meaning not selected yet.
      permissions << p.text unless p.text == '' || p.text == 'Select...' || p[:role] == 'option'
    end
    permissions
  end

  def remove_permission(permission)
    return if permission.blank?

    puts "remove permission #{permission}"
    permissions_select.find(:xpath,
                            "//*[contains(text(), '#{permission}')]/following-sibling::*")
                      .click
  end

  def select_role(role)
    role_select.find(:xpath, ".//div[contains(text(),'#{role}')]").click
  end

  def selectable_roles
    role_select.all(:xpath, './/div').collect(&:text)
  end

  def add_permission(permission)
    # open the drop-down
    permissions_select.click
    sleep 1

    find(:xpath,
         "//*[@id='AssignPermissions']/./div[2]/div/div[contains(text(), '#{permission}')]")
      .click
  end

  def detail_page_value(label_name)
    find(:xpath, "//label[contains(text(),'" + label_name + "')]/following-sibling::span").text
  end

  def detail_page_input_value(label_name)
    find(:xpath, "//label[contains(text(),'" + label_name + "')]/input").value
  end

  def status_from_dropdown
    find_by_id('StatusDropDown').text
  end

  def role_from_dropdown
    find_by_id('RolesDropDown').text
  end

  def change_status(new_status)
    old_status = new_status == 'Active' ? 'Inactive' : 'Active'
    if find_by_id('StatusDropDown').text == new_status
      puts "The status is already #{new_status}.  Maybe we're still loading."
      find_by_id('StatusDropDown', text: old_status)
    end

    # find the status selectbox and drop it down

    find_by_id('StatusDropDown').click
    find_by_id('StatusDropDown').find(:xpath, 'div/div/*', text: new_status).click
    true
  end

  def expect_success
    expect(page).to have_content('Your changes have been made successfully')
  end

  def new_email_address
    "capqacwds+test+#{Time.now.strftime('%y%m%d.%H%M%S')}+#{rand(100_000)}@gmail.com"
  end

  def verify_and_wait_to_complete
    click_button 'Verify User'
    Capybara.using_wait_time 20 do
      expect(page).to have_button('Add User')
      expect(page).to have_content('Please Verify')
    end
  end

  def verify_and_wait_to_fail(message)
    click_button 'Verify User'
    expect(page).to have_content(/Loading...|#{message}/)
    expect(page).to have_content(message)
  end

  def details_account_status
    find(:xpath,
         "//label[contains(text(),'Account Status')]/following-sibling::span").text
  end

  def resend_registration_email_success
    expect(page.has_selector?('div.successMessage-customizable',
                              text: 'Registration email has been sent successfully')).to be
  end

  def save_and_confirm
    click_button 'SAVE'
    sleep 2
    click_button 'Confirm' if has_button? 'Confirm'
    expect_success
    sleep 3
  end

  private

  def permissions_click
    find(:xpath, '//*[@id="AssignPermissions"]').click
  end

  def permissions_select
    # click off the componenet first.  Should collapse the select if it was expended.

    find('label', text: 'Assigned Permissions').click
    # permissions_click
    all(
      :xpath,
      "//label[contains(text(),'Assigned Permissions')]/following-sibling::div/div/div"
    ).last
  end

  def roles_click
    find(:xpath, '//*[@id="RolesDropDown"]').click
  end

  def role_select
    # click off the componenet first.  Should collapse the select if it was expended.

    find('label', text: 'Role').click
    roles_click.all(
      :xpath,
      "//label[contains(text(),'Role')]/following-sibling::div/div/div"
    ).last
  end
end
