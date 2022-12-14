import * as iam from "aws-cdk-lib/aws-iam";
import { Cognito, use } from "@serverless-stack/resources";
import { MetadataDB } from "./MetadataDB";
import { ApiStack } from "./ApiStack";
import * as cognito from "aws-cdk-lib/aws-cognito";

export function AuthStack({ stack, app }) {
  const { bucket } = use(MetadataDB);
  const { api } = use(ApiStack);
  

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
   
    cdk:{
      userPool:{
        selfSignUpEnabled: false,
       userInvitation: {
          emailSubject: 'Invite to join our app!',
          emailBody: 'Hello {username}, you have been invited to join our app! Your temporary password is {####}.This is the link: https://d535s6voqyhjf.cloudfront.net  ',
          //smsMessage: 'Hello {username}, your temporary password for our awesome app is {####}',
          //mandar tambienn el link
        },
      }
  
    }
  },
    
 // }
  );

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn,
        //bucket.bucketArn + "/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  // Return the auth resource
  return {
    auth,
  };
}