import { consts } from "./consts.js";
import fetch from "node-fetch";

/**
 *
 * @returns {Promise<string>}
 */
export const createAuthKey = async ({ authToken, problem, baseURL }) => {
  try {
    const res = await fetch(`${baseURL}/start`, {
      method: consts.POST,
      headers: {
        [consts.X_AUTH_TOEKN]: authToken,
        [consts.Content_Type]: consts.APPLICATION_JSON,
      },
      body: {
        problem,
      },
      body: JSON.stringify({ problem }),
    });
    if (!res.ok) throw new Error("서버 이상 " + res.json());
    const { auth_key } = await res.json();
    return auth_key;
  } catch (e) {
    console.log(e);
    throw new Error("Create Auth Key fail", e);
  }
};
