import { Construct, CfnOutput, Stack, StackProps, RemovalPolicy } from '@aws-cdk/core'
import { IBucket, Bucket, BucketProps } from '@aws-cdk/aws-s3'
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment'
import { CloudFrontWebDistribution, CloudFrontWebDistributionProps } from '@aws-cdk/aws-cloudfront'
import { mergeRight } from 'ramda'

export interface WebUIProps extends StackProps {
  bucketName: string
  staticSiteEntry: string
  staticSiteBuildPath: string
  bucketProps?: Omit<BucketProps, 'bucketName' | 'websiteIndexDocument'>
  cloudfrontProps?: Omit<CloudFrontWebDistributionProps, 'originConfigs'>
}

export class WebUiStack extends Stack {
  public readonly s3Bucket: IBucket
  public readonly cloudfrontDistribution: CloudFrontWebDistribution
  public readonly s3BucketDeployment: BucketDeployment
  public readonly outputs: CfnOutput

  constructor(scope: Construct, id: string, props: WebUIProps) {
    super(scope, id, props)

    const { bucketName, staticSiteBuildPath, staticSiteEntry, bucketProps, cloudfrontProps } = props

    const defaultBucketProps: BucketProps = {
      bucketName,
      publicReadAccess: true,
      websiteIndexDocument: staticSiteEntry,
      removalPolicy: RemovalPolicy.DESTROY,
    }

    const combinedBucketProps = bucketProps ? mergeRight(defaultBucketProps, bucketProps) : defaultBucketProps

    // ------------------------------------
    // S3
    // ------------------------------------

    const bucketScopeId = this.buildScopeId('bucket')
    this.s3Bucket = new Bucket(this, bucketScopeId, combinedBucketProps)

    const defaultCloudfrontDistributionProps: CloudFrontWebDistributionProps = {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.s3Bucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    }
    const combinedCloudfrontDistributionProps = cloudfrontProps
      ? mergeRight(defaultCloudfrontDistributionProps, cloudfrontProps)
      : defaultCloudfrontDistributionProps

    // ------------------------------------
    // Cloudfront Distribution
    // ------------------------------------

    const cloudfrontScopeId = this.buildScopeId('cdn')
    this.cloudfrontDistribution = new CloudFrontWebDistribution(
      this,
      cloudfrontScopeId,
      combinedCloudfrontDistributionProps,
    )

    // ------------------------------------
    // S3 Deployment
    // ------------------------------------

    const bucketDeploymentScopeId = this.buildScopeId('bucket-deployment')
    this.s3BucketDeployment = new BucketDeployment(this, bucketDeploymentScopeId, {
      sources: [Source.asset(staticSiteBuildPath)],
      destinationBucket: this.s3Bucket,
      distribution: this.cloudfrontDistribution,
    })

    // ------------------------------------
    // output
    // ------------------------------------

    new CfnOutput(this, 'CloudfrontDistributionDomainOutput', {
      value: this.cloudfrontDistribution.domainName,
      exportName: 'CloudfrontDistribution',
    })

    new CfnOutput(this, 'CloudfrontDistributionIdOutput', {
      value: this.cloudfrontDistribution.distributionId,
      exportName: 'CloudfrontDistributionId',
    })
  }

  buildScopeId(scopeId: string): string {
    return `${this.stackName}-${scopeId}`
  }
}
