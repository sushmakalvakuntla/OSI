FROM selenium/node-chrome

USER root

RUN apt-get update && apt-get install -y curl
RUN curl https://chromedriver.storage.googleapis.com/2.31/chromedriver_linux64.zip -o /usr/local/bin/chromedriver
RUN chmod +x /usr/local/bin/chromedriver

RUN apt-get update && apt-get install -y git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev xvfb
RUN apt-add-repository ppa:brightbox/ruby-ng && apt-get update
RUN apt-get install -y ruby2.4-dev ruby2.4
RUN mkdir /app
WORKDIR app
ADD Gemfile Gemfile.lock /app/
RUN gem update --system
RUN gem install bundler && bundle install
ADD . /app


# Install Xvfb init script
ENV DISPLAY :99

ADD docker/test/run.sh /run.sh
RUN chmod a+x /run.sh

CMD /run.sh

