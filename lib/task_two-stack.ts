import { Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiAws from "aws-cdk-lib/aws-apigateway";
import * as dynamo from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class TaskTwoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apiAws.RestApi(this, "the-crud-api", {
      restApiName: "the-crud-api",
      description: "use to do CRUD API",
      deploy: true,
    });

    const table = new dynamo.Table(this, "userTable", {
      tableName: "userTable",
      partitionKey: {
        name: "id",
        type: dynamo.AttributeType.NUMBER,
      },
      billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
    });
    const handler = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("dist/bundle"),
      handler: "index.handler",
      environment: {
        TABLE_NAME: "userTable",
      },
    });
    table.grantReadWriteData(handler);
    const getUserIntegration = new apiAws.LambdaIntegration(handler);
    api.root.addResource("{userId}").addMethod("ANY", getUserIntegration);
  }
}
