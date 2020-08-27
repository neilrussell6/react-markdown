#!/usr/bin/env bash

CLOUDFORMATION_DIR="src/cloudformation"

# ------------------------------------------------------
# import stage env
# ------------------------------------------------------

function load_stage_env() {
  local STAGE="${1}"

  set -o allexport
  [[ -f .env.${STAGE} ]] && source .env.${STAGE}
  set +o allexport
}

# ------------------------------------------------------
# ls
# ------------------------------------------------------

function ls() {
  local STAGE="${1:-$DEFAULT_STAGE}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"

  echo "listing stacks ..."
  STAGE="${STAGE}" npx cdk ls --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}"
}

# ------------------------------------------------------
# synth
# ------------------------------------------------------

function synth() {
  local STAGE="${1}"

  load_stage_env ${STAGE}

  local PROFILE="${AWS_PROFILE:-default}"
  local STACK="${APP_NAME}-${PACKAGE_NAME}"

  STAGE="${STAGE}" npx cdk synth --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}" \
    > "${CLOUDFORMATION_DIR}/${STACK}.cloudformation.yml"
}

# ------------------------------------------------------
# deploy
# ------------------------------------------------------

function deploy() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"
  local STACK="${APP_NAME}-${PACKAGE_NAME}"

  synth "${STAGE}"

  echo "deploying app (including all stacks) to '${STAGE}' stage ..."
  STAGE="${STAGE}" npx cdk deploy "${STACK}-${STAGE}" --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}"
}

# ------------------------------------------------------
# destroy
# ------------------------------------------------------

function destroy() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"

  echo "destroying  app (including all stacks) on '${STAGE}' stage ..."
  STAGE="${STAGE}" npx cdk destroy "*" --profile ${PROFILE} --region ${AWS_DEFAULT_REGION}
}

# ------------------------------------------------------
# bootstrap
# ------------------------------------------------------

function bootstrap() {
  local STAGE="${1:-$DEFAULT_STAGE}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"
  local AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-$DEFAULT_REGION}"

  echo "bootstraping '${STAGE}' stage ..."
  npx cdk bootstrap --profile ${PROFILE} --region ${AWS_DEFAULT_REGION} # ? is region required
}

"$@"
