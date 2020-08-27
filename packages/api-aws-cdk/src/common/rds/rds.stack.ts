import { Construct, Duration, Stack, SecretValue } from '@aws-cdk/core'
import { DatabaseInstance, DatabaseInstanceEngine, StorageType } from '@aws-cdk/aws-rds'
import { InstanceClass, InstanceSize, InstanceType, Vpc, SecurityGroup, SubnetType } from '@aws-cdk/aws-ec2'

import { RDSStackProps } from './rds.types'

export class RDSStack extends Stack {
  private readonly _id: string
  private readonly _stage: string
  private readonly _vpc: Vpc
  private readonly _securityGroup: SecurityGroup
  postgresInstance: DatabaseInstance

  constructor(scope: Construct, id: string, props: RDSStackProps) {
    super(scope, id, props)
    const { stage, vpc, securityGroup } = props
    this._id = id
    this._stage = stage
    this._vpc = vpc
    this._securityGroup = securityGroup
  }

  createDatabase(
    masterUsername: string,
    databaseName: string,
    masterUserPassword: unknown,
    port: string,
  ): DatabaseInstance {
    this.postgresInstance = new DatabaseInstance(this, this._id, {
      engine: DatabaseInstanceEngine.POSTGRES,
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
      vpc: this._vpc,
      securityGroups: [this._securityGroup],
      vpcPlacement: { subnetType: SubnetType.PUBLIC },
      storageEncrypted: true,
      multiAz: false,
      autoMinorVersionUpgrade: false,
      allocatedStorage: 25,
      storageType: StorageType.GP2,
      backupRetention: Duration.days(3),
      deletionProtection: false,
      masterUsername,
      databaseName,
      masterUserPassword: masterUserPassword as SecretValue,
      port: parseInt(port),
      instanceIdentifier: this._id,
    })
    return this.postgresInstance
  }
}
