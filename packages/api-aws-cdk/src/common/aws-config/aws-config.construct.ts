import { Construct } from '@aws-cdk/core'
import { Secret } from '@aws-cdk/aws-secretsmanager'
import { StringParameter } from '@aws-cdk/aws-ssm'
import { mergeRight, map } from 'ramda'

import { AWSConfigProps, Config } from './aws-config.types'

export class AWSConfig extends Construct {
  private readonly _id: string
  public readonly config: Config

  constructor(scope: Construct, id: string, props: AWSConfigProps) {
    super(scope, id)
    this._id = id
    const { stage, secretsManagerKeys, paramStoreKeys, paramStorePrefix } = props
    const secrets = this.getSecrets(secretsManagerKeys)
    const params = this.getParams(paramStorePrefix, stage, paramStoreKeys)
    this.config = mergeRight(secrets, params)
  }

  getSecrets(secretsManagerKeys: { [key: string]: string }): Config {
    const secretsARN = <string>process.env.SECRETS_ARN
    const name = `${this._id}Secrets`
    const secret = Secret.fromSecretArn(this, name, secretsARN)
    return map((secretName: string) => secret.secretValueFromJson(secretName).toString(), secretsManagerKeys)
  }

  getParams(prefix: string, stage: string, paramStoreKeys: { [key: string]: string }): Config {
    return map((key: string) => {
      const parameterName = `/${prefix}/${stage}/${key}`
      return StringParameter.valueForStringParameter(this, parameterName).toString()
    }, paramStoreKeys)
  }
}
