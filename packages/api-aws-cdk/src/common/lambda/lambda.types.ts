import { FunctionProps, Function } from '@aws-cdk/aws-lambda'
import { Construct } from '@aws-cdk/core'

export type BuildLambdaFunction = (
  scope: Construct,
  handler: string,
  environment: {},
  stackProps?: FunctionProps,
) => Function
