import { Api, use } from "@serverless-stack/resources";
import { MetadataDB } from "./MetadataDB";


export function ApiStack({ stack, app }) {
  const { table } = use(MetadataDB);
  const { bucket } = use(MetadataDB);

  // Create the API
  const api = new Api(stack, "Api", {
   
    defaults: {
      authorizer: "iam",
      function: {
        
        bind: [table,bucket],
        environment: {
          TABLE_NAME: table.tableName,
          BUCKET_NAME: bucket.bucketName,
          BUCKET_REGION:app.region,
          BUCKET_ARN:bucket.bucketArn,
        },

      },
    
    },
    //routes: {
    //  "GET /private": "functions/private.handler",
    //  "GET /public": {
    //    function: "functions/public.handler",
    //    authorizer: "none",
    //  }, ejemplo de como seria para poner esto despues
    routes: {
      "POST /dataElement": "functions/create.main",
      "GET /dataElement": "functions/getAll.main",
      "GET /files": "functions/getFiles.main",
      "GET /dataElement/{dataElementid}": "functions/getDataElement.main",
      "PUT /dataElement/update/{dataelementid}": "functions/update.main",
      "DELETE /dataElement/delete/{dataelementid}": "functions/delete.main",
      "DELETE /filesDel": "functions/deleteFile.main",
      "GET /file/{FileId}": "functions/File.main",
      "PUT /updateFile": "functions/updateFile.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url  
  });

  // Return the API resource
  return {
    api,
  };
}