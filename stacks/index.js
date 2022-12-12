import { MetadataDB } from "./MetadataDB";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";

export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(MetadataDB).stack(ApiStack).stack(AuthStack);
}
