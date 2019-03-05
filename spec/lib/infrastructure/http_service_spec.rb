# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe HttpService do
    let(:connection) { instance_double('Faraday::Connection') }
    let(:api_error_exception) { CapFaradayMiddleware::ApiErrorException }
    let(:last_name) { 'my_name' }
    describe '#get' do
      context 'returns a valid API response' do
        parameters = {
          enable: 'true',
          permissions: %w[snapshot hotline]
        }
        it 'makes a get request' do
          allow(Faraday).to receive(:new)
            .with(url: 'https://perry.test')
            .and_return(connection)
          expect(connection).to receive(:get)
            .with("/resource?#{parameters.to_query}&token=showbiz_pizza_token")
          Infrastructure::HttpService.new.get('/resource', parameters, 'showbiz_pizza_token')
        end
      end
    end

    describe '#post' do
      let(:request) { instance_double('Faraday::Request') }
      let(:post_parameters) { {} }
      let(:headers) { { 'Content-Type': 'URL-encoded' } }

      it 'sets json and uses the default adapter' do
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection)
          .and_return(connection)
        expect(connection).to receive(:use).with(api_error_exception)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection)
          .to receive(:adapter)
          .with(Faraday.default_adapter)
        allow(connection)
          .to receive(:post)
          .with(no_args)
          .and_yield(request)
        allow(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        allow(request)
          .to receive(:headers)
          .and_return(headers)
        allow(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.post('/resource', post_parameters, 'showbiz_pizza_token')
      end

      it 'makes a post request requiring JSON' do
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:use)
          .with(api_error_exception)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:post)
          .with(no_args)
          .and_yield(request)
        expect(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        expect(request)
          .to receive(:headers)
          .and_return(headers)
        expect(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.post('/resource', post_parameters, 'showbiz_pizza_token')
        expect(headers['Content-Type']).to eq 'application/json'
      end
    end

    describe '#put' do
      let(:request) { instance_double('Faraday::Request') }
      let(:put_parameters) { {} }
      let(:headers) { { 'Content-Type': 'URL-encoded' } }

      it 'sets json and uses the default adapter' do
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection)
          .and_return(connection)
        expect(connection)
          .to receive(:use)
          .with(api_error_exception)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection)
          .to receive(:put)
          .with(no_args)
          .and_yield(request)
        allow(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        allow(request)
          .to receive(:headers)
          .and_return(headers)
        allow(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.put('/resource', put_parameters, 'showbiz_pizza_token')
      end

      it 'makes a put request requiring JSON' do
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:use)
          .with(api_error_exception)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:put)
          .with(no_args)
          .and_yield(request)
        expect(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        expect(request)
          .to receive(:headers)
          .and_return(headers)
        expect(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.put('/resource', put_parameters, 'showbiz_pizza_token')
        expect(headers['Content-Type']).to eq 'application/json'
      end
    end
    describe '#patch' do
      let(:request) { instance_double('Faraday::Request') }
      let(:patch_parameters) { {} }
      let(:headers) { { 'Content-Type': 'URL-encoded' } }
      let(:enabled) { 'true' }
      let(:permissions) { ['snapshot', ['hotline']] }

      it 'sets json and uses the default adapter' do
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection)
          .and_return(connection)
        expect(connection)
          .to receive(:use)
          .with(api_error_exception)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection)
          .to receive(:patch)
          .with(no_args)
          .and_yield(request)
        allow(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        allow(request)
          .to receive(:headers)
          .and_return(headers)
        allow(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.patch('/resource', patch_parameters, 'showbiz_pizza_token')
      end

      it 'makes a put request requiring JSON' do
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:use)
          .with(api_error_exception)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:patch)
          .with(no_args)
          .and_yield(request)
        expect(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        expect(request)
          .to receive(:headers)
          .and_return(headers)
        expect(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.patch('/resource', patch_parameters, 'showbiz_pizza_token')
        expect(headers['Content-Type']).to eq 'application/json'
      end
    end

    describe '#delete' do
      let(:request) { instance_double('Faraday::Request') }
      let(:headers) { { 'Content-Type': 'URL-encoded' } }

      it 'sets json and uses the default adapter' do
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection)
          .and_return(connection)
        expect(connection).to receive(:use).with(api_error_exception)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection)
          .to receive(:adapter)
          .with(Faraday.default_adapter)
        allow(connection)
          .to receive(:delete)
          .with(no_args)
          .and_yield(request)
        allow(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        allow(request)
          .to receive(:headers)
          .and_return(headers)
        Infrastructure::HttpService.new.delete('/resource', 'showbiz_pizza_token')
      end

      it 'makes a delete request requiring JSON' do
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:use)
          .with(api_error_exception)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:delete)
          .with(no_args)
          .and_yield(request)
        expect(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        expect(request)
          .to receive(:headers)
          .and_return(headers)
        Infrastructure::HttpService.new.delete('/resource', 'showbiz_pizza_token')
        expect(headers['Content-Type']).to eq 'application/json'
      end
    end
  end
end
