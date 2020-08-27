import 'source-map-support/register'
import { App, Aws } from '@aws-cdk/core'

import { WebUiStack } from './stack/markdown-web-ui.stack'

const appName = `${process.env.APP_NAME}-${process.env.PACKAGE_NAME}`
const stageName = process.env.STAGE || 'dev'
const accountId = Aws.ACCOUNT_ID
const region = Aws.REGION

// ------------------------------------
// app
// ------------------------------------

const app = new App()

// ------------------------------------
// stacks
// ------------------------------------

// Web UI

const stackName = `${appName}-${stageName}`
const staticSiteEntry = 'index.html'
const staticSiteBuildPath = '../web-ui/build'

new WebUiStack(app, stackName, {
  bucketName: `${stackName}-${accountId}-${region}`,
  staticSiteEntry,
  staticSiteBuildPath,
})
