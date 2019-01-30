# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe ResendRegistration do
    describe 'attributes' do
      subject { ResendRegistration }
      it { is_expected.to have_attribute(:user_id, Types::String.optional) }
    end
  end
end
