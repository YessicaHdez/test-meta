import { Api, use } from "@serverless-stack/resources";
import { MetadataDB } from "./MetadataDB";

export function ApiStack({ stack, app }) {
  const { table } = use(MetadataDB);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "POST /dataElement": "functions/create.main",
      "GET /dataElement": "functions/get.main",
      "PUT /dataElement/{dataelement}": "functions/update.main",
      "DELETE /dataElement/{dataelement}": "functions/delete.main",
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