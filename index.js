import { config } from "./config.js";
import { ApiService } from "./ApiService.js";
import { createAuthKey } from "./createAuthKey.js";
import { App } from "./App.js";

const { baseURL, authToken, problem } = config;

const key = await createAuthKey({
  problem,
  authToken,
  baseURL,
});

const apiService = new ApiService({ authKey: key, baseURL });
const app = new App({
  apiService,
});

app.run();
