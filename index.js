import { config } from "./config.js";
import ApiService from "./ApiService.js";
import { createAuthKey } from "./createAuthKey.js";
import { V1 } from "./v1.js";
import { V2 } from "./v2.js";

const { baseURL, authToken, problem } = config;

const key = await createAuthKey({
  problem,
  authToken,
  baseURL,
});

const apiService = new ApiService({ authKey: key, baseURL });

const app = new V1({
  apiService,
});

app.run();
