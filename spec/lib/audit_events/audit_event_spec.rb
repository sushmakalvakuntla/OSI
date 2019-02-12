# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module AuditEvents
  describe AuditEvent do
    describe 'attributes' do
      subject { AuditEvent }
      it { is_expected.to have_attribute(:event, EventDetails) }
      it { is_expected.to have_attribute(:timestamp, Types::String) }
      it { is_expected.to have_attribute(:comment, Types::String) }
      it { is_expected.to have_attribute(:event_type, Types::String) }
      it { is_expected.to have_attribute(:event_source, Types::String) }
    end
  end
end
