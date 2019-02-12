# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module AuditEvents
  class EventDetails < Dry::Struct
    constructor_type :schema
    attribute :admin_role, Types::String
    attribute :admin_name, Types::String
    attribute :user_roles, Types::String
    attribute :user_id, Types::String
    attribute :user_name, Types::String
    attribute :old_value, Types::String
    attribute :new_value, Types::String
    attribute :office_id, Types::String
    attribute :county_name, Types::String
  end
end
