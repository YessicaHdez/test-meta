// Import required AWS SDK clients and commands for Node.js.
import { CopyObjectCommand } from "@aws-sdk/client-s3";
// Helper function that creates an Amazon S3 service client module.

import { S3Client } from "@aws-sdk/client-s3";


export const main = async (event) => {
    const data = JSON.parse(event.body);
    console.log(event.headers.mykey);
    const user = event.headers.mykey.split("/");
    console.log(user);

    const params = { 
        Bucket: process.env.BUCKET_NAME, 
        CopySource: `${process.env.BUCKET_NAME}/` + event.headers.mykey,
        Key:`${user[0]}`+"/" +data.newName,
    };
    console.log(params);
    //
    
    const client = new S3Client( {region: process.env.BUCKET_REGION });
    const newdata = await client.send(new CopyObjectCommand(params));
       // console.log("Success", newdata);
    
    return newdata; // For unit tests.
    
   
    //const data = await client.send(new CopyObjectRequest(params));
        
   
}
