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
  local STAGE="${1}"

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

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"
  local STACK="${APP_NAME}-${PACKAGE_NAME}"

  local STACK_VPC="${STACK}-vpc-${STAGE}"
  echo "generating cloudformation for '${STACK_VPC}' stack ..."
  STAGE="${STAGE}" npx cdk synth "${STACK_VPC}" --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}" \
    > "${CLOUDFORMATION_DIR}/${STACK_VPC}.cloudformation.yml"

  local STACK_RDS="${STACK}-rds-${STAGE}"
  echo "generating cloudformation for '${STACK_RDS}' stack ..."
  STAGE="${STAGE}" npx cdk synth "${STACK_RDS}" --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}" \
    > "${CLOUDFORMATION_DIR}/${STACK_RDS}.cloudformation.yml"
  echo "STAGE=${STAGE} npx cdk synth ${STACK_RDS} --profile ${PROFILE} --region ${AWS_DEFAULT_REGION}"

  local STACK_LAMBDA="${STACK}-lambda-${STAGE}"
  echo "generating cloudformation for '${STACK_LAMBDA}' stack ..."
  STAGE="${STAGE}" npx cdk synth "${STACK_LAMBDA}" --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}" \
    > "${CLOUDFORMATION_DIR}/${STACK_LAMBDA}.cloudformation.yml"
}

# ------------------------------------------------------
# deploy
# ------------------------------------------------------

function deploy() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"

  synth "${STAGE}"

  local STACK="${APP_NAME}-${PACKAGE_NAME}"
  echo "deploying app (including all stacks) to '${STAGE}' stage ..."
  STAGE="${STAGE}" npx cdk deploy "${STACK}-vpc-${STAGE}" "${STACK}-rds-${STAGE}" "${STACK}-lambda-${STAGE}" --profile "${PROFILE}" --region "${AWS_DEFAULT_REGION}"
}

# ------------------------------------------------------
# destroy
# ------------------------------------------------------

function destroy() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"

  echo "destroying app (including all stacks) on '${STAGE}' stage ..."
  STAGE="${STAGE}" npx cdk destroy "*" --profile ${PROFILE} --region ${AWS_DEFAULT_REGION}
}

# ------------------------------------------------------
# bootstrap
# ------------------------------------------------------

function bootstrap() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"

  echo "bootstraping '${STAGE}' stage ..."
  npx cdk bootstrap --profile ${PROFILE} --region ${AWS_DEFAULT_REGION}
}

"$@"
