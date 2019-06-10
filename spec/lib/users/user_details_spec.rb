# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe UserDetails do
    describe 'attributes' do
      subject { UserDetails }
      it { is_expected.to have_attribute(:username, Types::String.optional) }
      it { is_expected.to have_attribute(:id, Types::String.optional) }
      it { is_expected.to have_attribute(:first_name, Types::String.optional) }
      it { is_expected.to have_attribute(:last_name, Types::String.optional) }
      it { is_expected.to have_attribute(:county_name, Types::String.optional) }
      it { is_expected.to have_attribute(:racfid, Types::String.optional) }
      it { is_expected.to have_attribute(:start_date, Types::String.optional) }
      it { is_expected.to have_attribute(:end_date, Types::String.optional) }
      it { is_expected.to have_attribute(:office_id, Types::String.optional) }
      it { is_expected.to have_attribute(:phone_number, Types::String.optional) }
      it { is_expected.to have_attribute(:email, Types::String.optional) }
      it { is_expected.to have_attribute(:user_create_date, Types::String.optional) }
      it { is_expected.to have_attribute(:user_last_modified_date, Types::String.optional) }
      it { is_expected.to have_attribute(:last_login_date_time, Types::String.optional) }
      it { is_expected.to have_attribute(:enabled, Types::Bool.optional) }
      it { is_expected.to have_attribute(:status, Types::String.optional) }
      it { is_expected.to have_attribute(:permissions, Types::Array.optional) }
      it { is_expected.to have_attribute(:verification_passed, Types::Bool.optional) }
      it { is_expected.to have_attribute(:verification_message, Types::String.optional) }
      it { is_expected.to have_attribute(:phone_extension_number, Types::String.optional) }
      it { is_expected.to have_attribute(:roles, Types::Array.optional) }
      it { is_expected.to have_attribute(:office_phone_number, Types::String.optional) }
      it { is_expected.to have_attribute(:office_phone_extension_number, Types::String.optional) }
      it { is_expected.to have_attribute(:notes, Types::String.optional) }
      it { is_expected.to have_attribute(:cws_privileges, Types::Array.optional) }
      it { is_expected.to have_attribute(:locked, Types::Bool.optional) }
      it { is_expected.to have_attribute(:cell_phone_number, Types::Bool.optional) }
    end
  end
end
