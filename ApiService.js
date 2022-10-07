import fetch from "node-fetch";
import { consts } from "./consts.js";

export class ApiService {
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
    const url = `${this.baseURL}/`;
    const method = consts.GET;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
      });

      if (!res.ok) {
        console.log("server error", res.status, res.statusText);
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
   * }>}
   */
  getGameResult = async () => {
    const url = `${this.baseURL}/`;
    const method = consts.GET;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
      });

      if (!res.ok) {
        console.log("server error", res.status, res.statusText);
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
    const url = `${this.baseURL}/`;
    const method = consts.GET;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
      });

      if (!res.ok) {
        console.log("server error", res.status, res.statusText);
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
    const url = `${this.baseURL}/`;
    const method = consts.PUT;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ pairs }),
      });

      if (!res.ok) {
        console.log("server error", res.status, res.statusText);
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
  changeGrade = async () => {
    const url = `${this.baseURL}/`;
    const method = consts.PUT;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ commands }),
      });

      if (!res.ok) {
        console.log("server error", res.status, res.statusText);
      }

      const json = await res.json();
      return json;
    } catch (e) {
      console.log("fail", e);
    }
  };

  /**
   * @param {{
   * }}
   * @returns {Promise<{
   * }>}
   */
  getScore = async () => {
    const url = `${this.baseURL}/score`;
    const method = consts.GET;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
      });

      if (!res.ok) {
        console.log("server error", res.status, res.statusText);
      }

      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e, "get score fail");
    }
  };
}
