// Import required AWS SDK clients and commands for Node.js.
import { ListObjectsCommand } from "@aws-sdk/client-s3";
// Helper function that creates an Amazon S3 service client module.

import { S3Client } from "@aws-sdk/client-s3";


export const main = async (event) => {
    const myKey = event.headers.key;
    
    //console.log(event.requestContext.authorizer.iam.cognitoIdentity.amr);
    //console.log(event.headers.key);
    const params = { Bucket: `${process.env.BUCKET_NAME}`, Prefix:`${myKey}/`};
    const client = new S3Client( {region: process.env.BUCKET_REGION });
    const data = await client.send(new ListObjectsCommand(params));

    return data.Contents
}
