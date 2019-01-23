# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe User do
    describe 'attributes' do
      subject { User }
      it { is_expected.to have_attribute(:edit_details, EditDetails) }
      it { is_expected.to have_attribute(:user, UserDetails) }
      it { is_expected.to have_attribute(:auditevents, Types::Array.optional) }
    end
  end
end
