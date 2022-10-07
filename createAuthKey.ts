import { consts } from "./consts.js";
import fetch from "node-fetch";

export const createAuthKey = async ({ authToken, problem, baseURL }: {
  authToken: string;
  problem: number;
  baseURL: string;
}) => {
  try {
    const res = await fetch(`${baseURL}/start`, {
      method: consts.POST,
      headers: {
        [consts.X_AUTH_TOEKN]: authToken,
        [consts.Content_Type]: consts.APPLICATION_JSON,
      },
      body: JSON.stringify({ problem }),
    });
    if (!res.ok) {
      console.log("createAuthKey 실패", res);
    }
    const { auth_key } = await res.json() as {auth_key: string};
    return auth_key;
  } catch (e) {
    console.log('create auth key fail');
    console.log(e);
  }
};
