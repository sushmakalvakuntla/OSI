@Library('jenkins-pipeline-utils') _

DOCKER_GROUP = 'cwds'
DOCKER_IMAGE = 'cap'
DOCKER_REGISTRY_CREDENTIALS_ID = '6ba8d05c-ca13-4818-8329-15d41a089ec0'
GITHUB_CREDENTIALS_ID = '433ac100-b3c2-4519-b4d6-207c029a103b'
CC_TEST_REPORTER_ID = 'e90a72f974bf96ece9ade12a041c8559fef59fd7413cfb08f1db5adc04337197'
DOCKER_CONTAINER_NAME = 'cap-latest'
SLACK_CHANNEL = '#tech-cap-updates'
SLACK_CREDENTIALS_ID = 'slackmessagetpt2'

def notify(String status) {
  status = status ?: 'SUCCESS'
    def colorCode = status == 'SUCCESS' ? '#00FF00' : '#FF0000'
    def summary = """*${status}*: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':\nMore detail in console output at <${env.BUILD_URL}|${env.BUILD_URL}>"""
    slackSend(
        channel: SLACK_CHANNEL,
        baseUrl: 'https://hooks.slack.com/services/',
        tokenCredentialId: SLACK_CREDENTIALS_ID,
        color: colorCode,
        message: summary
        )
}

def node_to_run_on() {
  env.NODE_NAME ?: 'cap-slave'
}

node(node_to_run_on()) {
  triggerProperties = pullRequestMergedTriggerProperties('county-admin-master')
  properties([
    parameters([
      string(name: 'INCREMENT_VERSION', defaultValue: '', description: 'major, minor, or patch')
    ]),
    pipelineTriggers([triggerProperties]),
    buildDiscarderDefaults('master')
  ])
  def app
    try {
      deleteDir()
        stage('Checkout') {
          checkout scm
        }

      stage('Notify SaaS') {
        sh "curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter"
        sh "chmod +x ./cc-test-reporter"
        sh "./cc-test-reporter before-build --debug"
      }

      stage('Increment Tag') {
        newTag = newSemVer(env.INCREMENT_VERSION)
      }

      stage('Build Docker Test Image') {
         app = buildDockerImageForTest('./docker/web/Dockerfile')
      }

      app.withRun("--env CI=true") { container ->
        stage('Lint') {
          lint()
          sh "docker exec -t ${container.id} bundler-audit"
          sh "docker exec -t ${container.id} brakeman"
        }

        stage('Unit Test') {
          sh "docker exec -t ${container.id} yarn test"
        }
        stage('Publish Coverage Reports') {
          sh "docker cp ${container.id}:/app/coverage ./coverage"
          last_commit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
          commited_at = sh(returnStdout: true, script: "git log -1 --pretty=format:'%ct'").trim()
          sh "chmod 755 code_climate_coverage_branch.sh"
          branch = sh(returnStdout: true, script: './code_climate_coverage_branch.sh').trim()
          sh "export GIT_COMMIT=${last_commit}"
          sh "export GIT_COMMIT_SHA=${last_commit}"
          sh "export GIT_COMMITED_AT=${commited_at}"
          sh "export GIT_BRANCH=${branch}"
          sh "./cc-test-reporter format-coverage --debug -p /app -t simplecov -o coverage/codeclimate.ruby.json coverage/ruby/.resultset.json"
          sh "./cc-test-reporter format-coverage --debug -p /app -t lcov -o coverage/codeclimate.javascript.json coverage/javascript/lcov.info"
          sh "./cc-test-reporter sum-coverage coverage/codeclimate.*.json -p 2"
          sh "./cc-test-reporter upload-coverage --debug -r ${CC_TEST_REPORTER_ID}"
        }
      }
      stage('Acceptance Test smoke test') {
        sh "docker-compose up -d --build"
        sh "sleep ${ACCEPTANCE_SLEEP_TIME}"
        sh "docker-compose exec --env COUNTY_AUTHORIZATION_ENABLED=true --env COUNTY_ADMIN_WEB_BASE_URL=county-admin-web:3000 -T county-admin-test bundle exec rspec spec/acceptance/county/search_user_list_page_spec.rb"
      }

      stage('Tag Repo') {
        tagGithubRepo(newTag, GITHUB_CREDENTIALS_ID)
      }

      stage('Build Docker Image') {
        app = docker.build("${DOCKER_GROUP}/${DOCKER_IMAGE}:${newTag}", "-f docker/web/Dockerfile .")
      }

      stage('Publish Image') {
        withDockerRegistry([credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID]) {
          app.push()
          app.push(newTag)
          app.push('latest')
        }
      }
      stage('Trigger Security scan') {
        build job: 'tenable-scan',
          parameters: [
            [$class: 'StringParameterValue', name: 'CONTAINER_NAME', value: "${DOCKER_IMAGE}"],
            [$class: 'StringParameterValue', name: 'CONTAINER_VERSION', value: "${newTag}"]
          ],
          wait: false
      }
      stage('TriggerReleasePipeline'){
           withCredentials([usernameColonPassword(credentialsId: 'fa186416-faac-44c0-a2fa-089aed50ca17', variable: 'jenkinsauth')]) {
          sh "curl -v -u $jenkinsauth 'https://jenkins.mgmt.cwds.io/job/PreInt-Integration/job/deploy-cap/buildWithParameters?token=trigger-cap-deploy&cause=Caused%20by%20Build%20${newTag}&version=${newTag}'"
        }
      }
      stage('Clean Up') {
        sh "docker images ${DOCKER_GROUP}/${DOCKER_IMAGE} --filter \"before=${DOCKER_GROUP}/${DOCKER_IMAGE}:${newTag}\" -q | xargs docker rmi -f || true"
      }
    } catch(Exception e) {
      currentBuild.result = "FAILURE"
        throw e
    } finally {
      archiveArtifacts artifacts: 'tmp/*', excludes: '*/.keep', allowEmptyArchive: true
      sh "docker-compose down"
      notify(currentBuild.result)
      cleanWs()
    }
}
