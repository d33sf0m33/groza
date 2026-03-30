import { defineCliConfig } from "sanity/cli";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
  deployment: {
    appId: "an325d1a9coua6a98fzfsjo0",
  },
});
