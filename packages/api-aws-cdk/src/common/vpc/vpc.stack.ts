import { App, Stack, StackProps } from '@aws-cdk/core'
import { Port, SecurityGroup, SubnetType, Vpc } from '@aws-cdk/aws-ec2'

// TODO: make this more generic and reusable
export class VPCStack extends Stack {
  private readonly _id: string
  public readonly vpc: Vpc
  public rdsSecurityGroup: SecurityGroup
  public lambdaSecurityGroup: SecurityGroup

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)
    this._id = id
    this.vpc = this.createVPC()
    this.createSecurityGroups()
  }

  createVPC(): Vpc {
    return new Vpc(this, this._id, {
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public-rds',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'private-lambdas',
          subnetType: SubnetType.PRIVATE,
        },
      ],
      natGateways: 1,
      natGatewaySubnets: { subnetType: SubnetType.PUBLIC },
    })
  }

  createSecurityGroups(): void {
    this.rdsSecurityGroup = new SecurityGroup(this, `${this._id}-rds-security-group`, {
      vpc: this.vpc,
      allowAllOutbound: true,
      securityGroupName: `${this._id}-rds-security-group`,
      description: `RDS Security Group for ${this._id} VPC`,
    })

    this.lambdaSecurityGroup = new SecurityGroup(this, `${this._id}-lambda-security-group`, {
      vpc: this.vpc,
      allowAllOutbound: true,
      securityGroupName: `${this._id}-lambda-security-group`,
      description: `Lambda Security Group for ${this._id} VPC`,
    })

    this.rdsSecurityGroup.addIngressRule(this.lambdaSecurityGroup, Port.tcp(5432))
  }
}
