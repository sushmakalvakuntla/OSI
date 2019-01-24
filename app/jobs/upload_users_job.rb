class UploadUsersJob < ApplicationJob
  queue_as :default

  def perform(users_file)

  end
end
