import { mergeRight } from 'ramda'
import { App, Construct } from '@aws-cdk/core'
import { SubnetType } from '@aws-cdk/aws-ec2'

import { buildLambdaFunction } from '../../common/lambda'
import { Stack as VPCStack } from '../../common/vpc'
import { Stack as RDSStack, buildPostgresDatabaseURL } from '../../common/rds'
import { Stack as LambdaRestApiStack } from '../../common/lambda-rest-api'
import { AWSConfig, Config } from '../../common/aws-config'
import * as PARAM_STORE_KEYS from '../../config/aws-params.json'
import * as SECRETS_MANAGER_KEYS from '../../config/aws-secrets.json'
import * as STATIC_CONFIG from '../../config/static.json'
import { MarkdownApiProps } from './markdown-api.types'

export class MarkdownApi extends Construct {
  public readonly vpcStack: VPCStack
  public readonly rdsStack: RDSStack
  public readonly lambdaRestApiStack: LambdaRestApiStack

  constructor(scope: App, id: string, props: MarkdownApiProps) {
    super(scope, id)
    const { stage, paramStorePrefix } = props
    this.vpcStack = this.createVPCStack(scope, id, stage)
    this.rdsStack = this.createRDSStack(scope, id, stage, paramStorePrefix)
    this.lambdaRestApiStack = this.createLambdaRestApiStack(scope, id, stage, paramStorePrefix)
  }

  private getConfig(scope: Construct, id: string, stage: string, paramStorePrefix: string): Config {
    // load AWS config
    const { config } = new AWSConfig(scope, `${id}-config-${stage}`, {
      stage,
      stackName: id,
      paramStorePrefix: paramStorePrefix,
      paramStoreKeys: PARAM_STORE_KEYS,
      secretsManagerKeys: SECRETS_MANAGER_KEYS,
    })

    // derive additional config
    const derivedConfig = {
      DATABASE_URL: buildPostgresDatabaseURL(config),
    }

    // merged configs
    return mergeRight(mergeRight(config, derivedConfig), STATIC_CONFIG)
  }

  private createVPCStack(scope: App, id: string, stage: string): VPCStack {
    return new VPCStack(scope, `${id}-vpc-${stage}`)
  }

  private createRDSStack(scope: App, id: string, stage: string, paramStorePrefix: string): RDSStack {
    const stack = new RDSStack(scope, `${id}-rds-${stage}`, {
      stage,
      vpc: this.vpcStack.vpc,
      securityGroup: this.vpcStack.rdsSecurityGroup,
    })
    const { PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT } = this.getConfig(stack, id, stage, paramStorePrefix)
    stack.createDatabase(PG_USER as string, PG_DATABASE as string, PG_PASSWORD as string, PG_PORT as string)
    return stack
  }

  private createLambdaRestApiStack(
    scope: App,
    id: string,
    stage: string,
    paramStorePrefix: string,
  ): LambdaRestApiStack {
    const stack = new LambdaRestApiStack(scope, `${id}-lambda-${stage}`, { stage })
    const envs = this.getConfig(stack, id, stage, paramStorePrefix)
    this.createLambdas(stack, id, stage, envs)
    return stack
  }

  private createLambdas(scope: LambdaRestApiStack, id: string, stage: string, envs: {}): void {
    // ... configure build lambda util
    const _buildLambdaFunction = buildLambdaFunction(
      'assets/api-handlers.zip',
      'api-handlers',
      `${id}-${stage}`,
      {
        vpc: this.vpcStack.vpc,
        securityGroup: this.vpcStack.lambdaSecurityGroup,
        vpcSubnets: { subnetType: SubnetType.PRIVATE },
      },
    )

    // ... build Lambdas
    const getCategoriesLambda = _buildLambdaFunction(scope, 'getCategories', envs)
    const getContentsLambda = _buildLambdaFunction(scope, 'getContents', envs)
    const getContentLambda = _buildLambdaFunction(scope, 'getContent', envs)

    // ... attach Lambdas through resources and methods
    const categories = scope.addResource('categories', 'GET', getCategoriesLambda)
    const contents = scope.addResource('contents', 'GET', getContentsLambda)
    const content = scope.addResource('{id}', 'GET', getContentLambda, contents)
  }
}
