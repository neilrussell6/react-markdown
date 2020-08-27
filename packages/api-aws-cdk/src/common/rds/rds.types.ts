import { StackProps } from '@aws-cdk/core'
import { SecurityGroup, Vpc } from '@aws-cdk/aws-ec2'

export interface RDSStackProps extends StackProps {
  stage: string
  vpc: Vpc
  securityGroup: SecurityGroup
}
