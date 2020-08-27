export interface AWSConfigProps {
  stage: string
  stackName: string
  secretsManagerKeys: {}
  paramStorePrefix: string
  paramStoreKeys: {}
}

export interface Config {
  [key: string]: string | number | boolean
}
