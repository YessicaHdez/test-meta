import { Api, use } from "@serverless-stack/resources";
import { MetadataDB } from "./MetadataDB";

export function ApiStack({ stack, app }) {
  const { table } = use(MetadataDB);
  const { bucket } = use(MetadataDB);
  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        authorizer: "iam",
        bind: [table,bucket],
        environment: {
          TABLE_NAME: table.tableName,
          BUCKET_NAME: bucket.bucketName,
          BUCKET_REGION:app.region,
          BUCKET_ARN:bucket.bucketArn,
        },
      },
      
    },
    routes: {
      "POST /dataElement": "functions/create.main",
      "GET /dataElement": "functions/getAll.main",
      "GET /files": "functions/getFiles.main",
      "GET /dataElement/{dataElementid}": "functions/getDataElement.main",
      "PUT /dataElement/update/{dataelementid}": "functions/update.main",
      "DELETE /dataElement/delete/{dataelementid}": "functions/delete.main",
      "DELETE /files/{object}": "functions/deleteFile.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}