// Helper function that creates an Amazon S3 service client module.
import { S3Client, DeleteObjectCommand  } from "@aws-sdk/client-s3";

 
export const main = async (event) => {
    const params = { Bucket: process.env.BUCKET_NAME, Key:event.pathParameters.object};
    //console.log(params);
    const client = new S3Client( {region: process.env.BUCKET_REGION });
    const command = new DeleteObjectCommand(params);
    const response = await client.send(command);

    return response.Contents
}