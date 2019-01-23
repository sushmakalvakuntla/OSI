# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class User < Dry::Struct
    constructor_type :schema
    attribute :edit_details, EditDetails
    attribute :user, UserDetails
    attribute :auditevents, Types::Array.optional
  end
end
