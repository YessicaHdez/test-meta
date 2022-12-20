// Import required AWS SDK clients and commands for Node.js.
import { GetObjectCommand } from "@aws-sdk/client-s3";
// Helper function that creates an Amazon S3 service client module.

import { S3Client } from "@aws-sdk/client-s3";


export const main = async (event) => {
    const params = { Bucket: process.env.BUCKET_NAME, Key:event.pathParameters.FileId};
    //console.log(params);
    const client = new S3Client( {region: process.env.BUCKET_REGION });
    const data = await client.send(new GetObjectCommand(params));
        
   

    return data.Contents
}
