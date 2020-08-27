#!/usr/bin/env bash

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
# cf
# ------------------------------------------------------

function cf() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  local PROFILE="${AWS_PROFILE:-default}"
  local STACK="${APP_NAME}-${PACKAGE_NAME}-${STAGE}"

  local CLOUDFRONT_TYPE="AWS::CloudFront::Distribution"
  local CLOUDFORMATION_RESOURCES=$(aws cloudformation list-stack-resources --stack-name "${STACK}" --query 'StackResourceSummaries[*].{id:PhysicalResourceId, type:ResourceType}')
  local CLOUDFRONT_ID=$(echo "${CLOUDFORMATION_RESOURCES}" | jq --arg v "${CLOUDFRONT_TYPE}" -c '.[] | select( .type == $v ) | .id' | tr -d '"')
  echo "Cloudfront ID: ${CLOUDFRONT_ID}"

  local CLOUDFRONT_DISTRIBUTION=$(aws cloudfront list-distributions | jq --arg v "${CLOUDFRONT_ID}" -c '.DistributionList.Items | .[] | { id: .Id, modified: .LastModifiedTime, url: .DomainName, status: .Status } | select( .id == $v )')
  local CLOUDFRONT_URL=$(echo "${CLOUDFRONT_DISTRIBUTION}" | jq '.url' | tr -d '"')

  echo "Cloudfront URL: https://${CLOUDFRONT_URL}/"
}

"$@"
