#!/usr/bin/env bash

DEFAULT_STAGE="dev"
DEFAULT_REGION="eu-west-1"
DEFAULT_RDS_INSTANCE_ID="tezos-fmc-transactions-api-rds-dev"

# ------------------------------------------------------
# import stage env
# ------------------------------------------------------

function load_stage_env() {
  local STAGE="${1:-$DEFAULT_STAGE}"

  set -o allexport
  [[ -f .env.${STAGE} ]] && source .env.${STAGE}
  set +o allexport
}

# ------------------------------------------------------
# rds ls
# ------------------------------------------------------

function rds-ls() {
  local STAGE="${1:-$DEFAULT_STAGE}"

  load_stage_env "${STAGE}"

  local RDS_INSTANCE_ID="${RDS_INSTANCE_ID-$DEFAULT_RDS_INSTANCE_ID}"
  aws rds describe-db-instances --db-instance-identifier $RDS_INSTANCE_ID \
  | jq '.DBInstances[] | { instanceID: .DBInstanceIdentifier, instanceClass: .DBInstanceClass, username: .MasterUsername, host: .Endpoint.Address, port: .Endpoint.Port, ARN: .DBInstanceArn, deletionProtection: .DeletionProtection }'
}

"$@"
