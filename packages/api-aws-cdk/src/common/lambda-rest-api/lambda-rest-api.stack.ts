import { Construct, Stack } from '@aws-cdk/core'
import { IResource, LambdaIntegration, LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { Function, Code, Runtime, IFunction } from '@aws-cdk/aws-lambda'

import { LambdaRestApiStackProps } from './lambda-rest-api.types'

export class LambdaRestApiStack extends Stack {
  public readonly api: LambdaRestApi

  constructor(scope: Construct, stackId: string, props: LambdaRestApiStackProps) {
    super(scope, stackId)
    this.api = this.createLambdaRestApi(stackId, props.stage)
  }

  private createLambdaRestApi(stackId: string, stage: string): LambdaRestApi {
    return new LambdaRestApi(this, stackId, {
      handler: this.createDefaultHandler(),
      proxy: false,
      options: { deployOptions: { stageName: stage } },
    })
  }

  private createDefaultHandler() {
    return new Function(this, 'default-handler', {
      handler: 'any',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromInline('module.exports.any = () => ({ statusCode: 200, headers: {}, body: null })'),
    })
  }

  addMethod(method: string, handler: IFunction, resource: IResource): IResource {
    const lambdaIntegration = new LambdaIntegration(handler)
    resource.addMethod(method, lambdaIntegration)
    return resource
  }

  addResource(pathPart: string, method: string, handler: IFunction, resource: IResource = this.api.root): IResource {
    const newResource = resource.addResource(pathPart)
    return this.addMethod(method, handler, newResource)
  }
}
