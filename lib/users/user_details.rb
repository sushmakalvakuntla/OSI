# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class UserDetails < Dry::Struct
    constructor_type :schema
    attribute :user, Types::Object.optional
    attribute :username, Types::String.optional
    attribute :id, Types::String.optional
    attribute :first_name, Types::String.optional
    attribute :last_name, Types::String.optional
    attribute :county_name, Types::String.optional
    attribute :start_date, Types::String.optional
    attribute :end_date, Types::String.optional
    attribute :office_id, Types::String.optional
    attribute :phone_number, Types::String.optional
    attribute :phone_extension_number, Types::String.optional
    attribute :office_phone_number, Types::String.optional
    attribute :office_phone_extension_number, Types::String.optional
    attribute :email, Types::String.optional
    attribute :user_create_date, Types::String.optional
    attribute :user_last_modified_date, Types::String.optional
    attribute :last_login_date_time, Types::String.optional
    attribute :enabled, Types::Bool.optional
    attribute :status, Types::String.optional
    attribute :permissions, Types::Array.optional
    attribute :verification_message, Types::String.optional
    attribute :verification_passed, Types::Bool.optional
    attribute :racfid, Types::String.optional
    attribute :roles, Types::Array.optional
    attribute :auth_header, Types::String.optional
    attribute :notes, Types::String.optional
    attribute :cws_privileges, Types::Array.optional
    attribute :locked, Types::Bool.optional
    attribute :cell_phone_number, Types::Bool.optional
  end
end
