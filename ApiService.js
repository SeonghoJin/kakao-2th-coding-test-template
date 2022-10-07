import fetch from "node-fetch";
import { consts } from "./consts.js";

export default class ApiService {
  constructor({ authKey, baseURL }) {
    /**
     * @private
     */
    this.authKey = authKey;
    /**
     * @private
     */
    this.baseURL = baseURL;
    /**
     * @private
     */
    this.defaultHeaders = {
      [consts.Authorization]: this.authKey,
      [consts.Content_Type]: consts.APPLICATION_JSON,
    };
  }

  /**
   * @param {}
   * @returns {Promise<{
   * }>}
   */
  getWaitingLine = async () => {
    try {
      const res = await fetch(`${this.baseURL}/waiting_line`, {
        method: consts.GET,
        headers: this.defaultHeaders,
      });

      if (!res.ok) {
        console.log('get waiting line fail', res);
      }
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e, "get waiting line fail");
    }
  };

  /**
   * @param {}
   * @returns {Promise<{
   *  game_result: import("./types.js").GameReuslt[]
   * }>}
   */
  getGameResult = async () => {
    try {
      const res = await fetch(`${this.baseURL}/game_result`, {
        method: consts.GET,
        headers: this.defaultHeaders,
      });

      if (!res.ok) {
        console.log('get waiting line fail', res);
      }
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e, "game result fail");
    }
  };

  /**
   *
   * @param {{
   * }}
   * @returns {Promise<{
   * }>}
   */
  getUserInfo = async () => {
    try {
      const res = await fetch(`${this.baseURL}/user_info`, {
        method: consts.GET,
        headers: this.defaultHeaders,
      });

      if (!res.ok) {
        console.log("get user info error", e);
      }

      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e, "get user info");
    }
  };

  /**
   *
   * @param {{
   * }}
   * @returns {Promise<{
   * }>}
   */
  match = async (pairs) => {
    try {
      const res = await fetch(`${this.baseURL}/match`, {
        method: consts.PUT,
        headers: this.defaultHeaders,
        body: JSON.stringify({ pairs }),
      });
      if (!res.ok) {
        console.log("server error", res);
      }
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e, "match");
    }
  };

  /**
   *
   * @param {{
   * }}
   * @returns {Promise<{
   * }>}
   */
  changeGrade = async (commands) => {
    console.log(commands);
    try {
      const res = await fetch(`${this.baseURL}/change_grade`, {
        method: consts.PUT,
        headers: this.defaultHeaders,
        body: JSON.stringify({ commands }),
      });

      if (!res.ok) {
        console.log(res);
      }
      const json = await res.json();
      return json;
    } catch (e) {
      throw new Error(e, "change grade fail");
    }
  };

  /**
   * @param {{
   * }}
   * @returns {Promise<{
   * }>}
   */
  getScore = async () => {
    try {
      const res = await fetch(`${this.baseURL}/score`, {
        method: consts.GET,
        headers: this.defaultHeaders,
      });

      if (!res.ok) {
        throw new Error("server error");
      }
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e, "get score fail");
    }
  };
}
