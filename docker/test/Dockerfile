FROM selenium/node-chrome

USER root

RUN apt-get update && apt-get install -y git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev xvfb
RUN apt-add-repository ppa:brightbox/ruby-ng && apt-get update
RUN apt-get install -y ruby2.4-dev ruby2.4
RUN mkdir /app
WORKDIR app
ADD Gemfile Gemfile.lock /app/
RUN gem update --system
RUN RAILS_ENV=production gem install bundler && bundle install

RUN CHROME_VERSION=$(google-chrome --version | sed -r 's/[^0-9]+([0-9]+\.[0-9]+\.[0-9]+).*/\1/g') && \
    CHROMEDRIVER_VERSION=$(curl -s https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION) && \
    bundle exec chromedriver-update $CHROMEDRIVER_VERSION

ADD . /app

ADD docker/test/run.sh /run.sh
RUN chmod a+x /run.sh

CMD /run.sh
