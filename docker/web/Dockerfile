FROM cwds/ruby:11
ENV ENVIRONMENT_REFRESH=2017-10-11 \
  RAILS_RELATIVE_URL_ROOT=/cap

RUN mkdir /app
WORKDIR /app
COPY Gemfile Gemfile.lock /app/
RUN bundle install --jobs 20 --retry 5
COPY package.json yarn.lock /app/
RUN yarn install --production=false --non-interactive --frozen-lockfile
COPY . /app
RUN NODE_ENV=production RAILS_ENV=production bundle exec rails assets:precompile && bundle exec bin/hack-to-copy-fonts.sh
RUN yarn install --production=false --non-interactive --frozen-lockfile
# Required because we have mapping issues in nginx
RUN ln -s /app/public/cap/packs /app/public/packs && ln -s /app/public/cap/assets /app/public/assets
VOLUME /app
EXPOSE 3000 3035
CMD ["bundle", "exec", "rails", "server"]
