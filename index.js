import { config } from "./config.js";
import ApiService from "./ApiService.js";
import { createAuthKey } from "./createAuthKey.js";
import { V1 } from "./app.js";
import { V2 } from "./v2.js";
import { V3 } from "./v3.js";
import { V4 } from "./v4.js";
import { V5 } from "./v5.js";

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
