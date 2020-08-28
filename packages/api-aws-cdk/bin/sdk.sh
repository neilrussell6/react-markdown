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
# rds ls
# ------------------------------------------------------

function rds-ls() {
  local STAGE="${1}"

  load_stage_env "${STAGE}"

  aws rds describe-db-instances --db-instance-identifier $RDS_INSTANCE_ID \
  | jq '.DBInstances[] | { instanceID: .DBInstanceIdentifier, instanceClass: .DBInstanceClass, username: .MasterUsername, host: .Endpoint.Address, port: .Endpoint.Port, ARN: .DBInstanceArn, deletionProtection: .DeletionProtection }'
}

"$@"
