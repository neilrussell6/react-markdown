import { Function, FunctionOptions, FunctionProps, Code, Runtime } from '@aws-cdk/aws-lambda'
import { Construct } from '@aws-cdk/core'

// ------------------------------------
// build lambda function
// ------------------------------------

// TODO: clean up
export const buildLambdaFunction = (
  codeAssetPath: string,
  codeFilename: string,
  functionNamePrefix: string,
  appProps?: FunctionOptions,
) => (scope: Construct, handler: string, environment: {}, stackProps?: FunctionProps): Function =>
  new Function(scope, handler, {
    ...appProps,
    ...stackProps,
    code: Code.fromAsset(codeAssetPath),
    handler: `${codeFilename}.${handler}`,
    runtime: Runtime.NODEJS_12_X,
    functionName: `${functionNamePrefix}-${handler}`,
    environment,
  })
