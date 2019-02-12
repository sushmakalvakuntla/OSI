# frozen_string_literal: true

require 'dry-struct'
require 'audit_events/types'

module AuditEvents
  class AuditEvent < Dry::Struct
    constructor_type :schema
    attribute :user_login, Types::String
    attribute :event, EventDetails
    attribute :comment, Types::String
    attribute :event_type, Types::String
    attribute :event_source, Types::String
    attribute :timestamp, Types::String
  end
end
