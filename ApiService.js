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
   * @returns {Promise<{
   *  reservations_info: import("./types").ReservationsInfo[]
   * }>}
   */
  getNewRequests = async () => {
    const url = `${this.baseURL}/new_requests`;
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
   * @param {
   *   import("./types").ReplyRequest[]
   * } replies
   * @returns {Promise<{
   *  day: number
   * }>}
   */
  reply = async (replies) => {
    const url = `${this.baseURL}/reply`;
    const method = consts.PUT;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({replies}),
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
   * @param {
   *     import('./types').RoomAssignRequest[]
   * } room_assign
   * @returns {Promise<{
   *  day: number;
   *  fail_count: number;
   * }>}
   */
  simulate = async (room_assign) => {
    const url = `${this.baseURL}/simulate`;
    const method = consts.PUT;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({room_assign})
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
