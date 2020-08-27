import 'source-map-support/register'
import { App } from '@aws-cdk/core'

import { MarkdownApi } from './modules/markdown-api'

const app = new App()

// create api stacks
new MarkdownApi(app, `${process.env.APP_NAME}-api`, {
  stage: process.env.STAGE || 'dev',
  paramStorePrefix: `${process.env.APP_NAME}/api`,
})
