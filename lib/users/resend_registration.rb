# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class ResendRegistration < Dry::Struct
    constructor_type :schema
    attribute :user_id, Types::String.optional
  end
end
