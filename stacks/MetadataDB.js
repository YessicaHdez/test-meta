import { Bucket, Table } from "@serverless-stack/resources";

export function MetadataDB({ stack, app }) {
    // Create an S3 bucket
    const bucket = new Bucket(stack, "logfiles", {
        cors: [
          {
            maxAge: "1 day",
            allowedOrigins: ["*"],
            allowedHeaders: ["*"],
            allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
          },
        ],
      });
  // Create the DynamoDB table
    const table = new Table(stack, "MetadataDictionary", {
    fields: {
      dataElement: "string",
      catalog: "string",
    },
    primaryIndex: { partitionKey: "dataElement"},
    });

    return {
        table,bucket,
    };
}