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
   * @returns {Promise<{locations: import("./types").Location[]}>}
   */
  getLocations = async () => {
    try {
      const res = await fetch(`${this.baseURL}/locations`, {
        method: consts.GET,
        headers: this.defaultHeaders,
      });

      if (!res.ok) {
        throw new Error("server error");
      }

      return await res.json();
    } catch (e) {
      throw new Error("get locations fail", e);
    }
  };

  /**
   * @param {}
   * @returns {Promise<{trucks: import("./types").Truck[]}>}
   */
  getTrucks = async () => {
    try {
      const res = await fetch(`${this.baseURL}/trucks`, {
        method: consts.GET,
        headers: this.defaultHeaders,
      });

      if (!res.ok) {
        throw new Error("server error");
      }

      return await res.json();
    } catch (e) {
      throw new Error("get locations fail", e);
    }
  };

  /**
   *
   * @param {{
   *    truck_id: number,
   *    command: number[],
   * }} commands
   * @returns {Promise<{
   *    status: string;
   *    time: number;
   *    failed_requests_count: number;
   *    distance: number;
   * }>}
   */
  simulate = async (commands) => {
    try {
      const res = await fetch(`${this.baseURL}/simulate`, {
        method: consts.PUT,
        headers: this.defaultHeaders,
        body: JSON.stringify({ commands }),
      });

      if (!res.ok) {
        throw new Error("server error");
      }

      const json = await res.json();
      console.log(json);
      return json;
    } catch (e) {
      throw new Error("simulate fail", e);
    }
  };

  /**
   *
   * @returns {Promise<{
   *    score: number
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

      return await res.json();
    } catch (e) {
      throw new Error("simulate fail", e);
    }
  };
}
