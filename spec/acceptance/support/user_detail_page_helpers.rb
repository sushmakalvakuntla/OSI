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
      permissions << p.text unless p.text == '' || p.text == 'Select...'
    end
    permissions
  end

  def remove_permission(permission)
    return if permission.blank?

    permissions_select.find(:xpath,
                            "//*[contains(text(), '#{permission}')]/following-sibling::*")
                      .click
  end

  def add_permission(permission)
    # open the drop-down
    permissions_click
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

  def change_status(new_status)
    # return if there's nothing to do.
    return if find_by_id('StatusDropDown').text == new_status

    # find the status selectbox and drop it down

    find_by_id('StatusDropDown').click
    find_by_id('StatusDropDown').find(:xpath, 'div/div/*', text: new_status).click
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

  private

  def permissions_click
    find(:xpath, '//*[@id="AssignPermissions"]').click
  end

  def permissions_select
    first(
      :xpath,
      "//label[contains(text(),'Assigned Permissions')]/following-sibling::div/div/div"
    )
  end
end
