# CAP

This README documents the steps necessary to get the
application up and running.

- ...

# First Time Setup

Install Ruby 2.5.1 (Check the version specified in the .ruby-version file, in case this readme is stale).

Example instructions for `rbenv` installed through Homebrew on Mac:

```
brew update
brew upgrade rbenv
brew upgrade ruby-build
rbenv install 2.5.1
```

Install language-specific package dependencies

```
bundle install # Ruby gems
yarn install # Node modules
```

# Running the App

There are two primary ways of running the CAP app:

1.  Running the CAP app and all dependencies locally using Docker, or...
2.  Running only the CAP app and redis, and using an existing environment such as Integration as an API backend.

## Running with Preint environment

In order to run against Preint environment:
https://github.com/ca-cwds/env-store/blob/master/envs/county-admin/.env.development.local

1.  Create a `.env` file and copy its body from the [CWDS env-store repo's county-admin/.env.development.local](https://github.com/ca-cwds/env-store/blob/master/envs/county-admin/.env.development.local) (the repo is private, for CWDS developers usage only).
2.  Run local instance of Redis (`docker-compose up redis` or `redis-server` if you have it installed)
3.  Run CAP application:
    1.  Run Rails (`rails s`), and the webpack dev server (`yarn start` or `./bin/webpack-dev-server`).
    2.  **OR** Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CAP root folder. Please do not include the foreman gem in the Gemfile

## Running everything locally with Docker Compose

You will need a full **.env** file for this.
Copy it from the [CWDS env-store repo's .env](https://github.com/ca-cwds/env-store/blob/master/envs/county-admin/.env) (the repo is private, for CWDS developers usage only).

In the .env file, update your DEV_IP value to represent your network IP address, for Perry redirection.

Once you have your **.env** file next to the **docker-compose.yml** file, start up your dependency applications by running:

`docker-compose up`

Then run Rails (`rails s`) and the webpack development server (`yarn start` or `./bin/webpack-dev-server`). **OR** Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CAP root folder. Please do not include the foreman gem in the Gemfile.

## Linting and Tests

To run the React test suite with watcher:

`yarn test`

and a one-time run with coverage

`yarn test:coverage`

Other commands:

```
yarn test:rspec # runs Rspec unit tests
yarn test:jest # just the jest react tests
yarn lint
```

# Questions

If you have any questions regarding the contents of this repository, please email the Office of Systems Integration at FOSS@osi.ca.gov.
