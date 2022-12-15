// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";


// Create an Amazon S3 service client object.
const REGION = "us-east-1";
const client = new S3Client( {region: REGION });
export { client };

