import { Config } from '../aws-config'

// ------------------------------------
// build postgres database URL
// ------------------------------------

export const buildPostgresDatabaseURL = ({ PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT, PG_HOST }: Config): string => {
  return `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`
}
