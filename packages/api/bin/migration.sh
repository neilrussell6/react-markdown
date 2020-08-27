#!/usr/bin/env bash

# ------------------------------------
# migrate
# ------------------------------------

function migrate() {
  node ./bin/migration.cli.js migrate "$@"
}
# ------------------------------------
# create
# ------------------------------------

unix_timestamp_m() {
  node -e 'console.log(Date.now())'
}

function create() {
  # module and dir path
  local MODULE=$1
  local TARGET_DIR="${PWD}/src/modules/${MODULE}/persistence/migrations"
  if [[ ! -d "${TARGET_DIR}" ]] ; then
    echo "ERROR: invalid module: ${TARGET_DIR} does not exist"
    exit 2
  fi

  # file name
  local FILE_NAME=$2
  if [[ -z "${FILE_NAME}" ]] ; then
    echo "ERROR: invalid migration file: not provided"
    exit 2
  fi

  # output path
  local TIMESTAMP=$(unix_timestamp_m)
  local OUTPUT_PATH="${TARGET_DIR}/${TIMESTAMP}-${FILE_NAME}.js"

  # create from template
  local MODULE_CAMELCASE="${MODULE}" # TODO: implement this
  local TPL_PATH="${PWD}/bin/migration.tpl"
  local TPL=$(cat "${TPL_PATH}")
  eval "echo \"${TPL}\"" > "${OUTPUT_PATH}"
}

"$@"
