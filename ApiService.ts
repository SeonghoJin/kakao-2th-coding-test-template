import fetch from "node-fetch";
import { consts } from "./consts.js";

export class ApiService {

  private readonly authKey: string;
  private readonly baseURL: string;
  private readonly defaultHeaders: {
    [consts.Authorization]: string;
    [consts.Content_Type]: typeof consts.APPLICATION_JSON;
  };

  constructor({ authKey, baseURL }) {
    this.authKey = authKey;
    this.baseURL = baseURL;
    this.defaultHeaders = {
      [consts.Authorization]: this.authKey,
      [consts.Content_Type]: consts.APPLICATION_JSON,
    };
  }

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

  match = async (pairs) => {
    const url = `${this.baseURL}/match`;
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

  changeGrade = async () => {
    const url = `${this.baseURL}/`;
    const method = consts.PUT;
    const headers = this.defaultHeaders;

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ }),
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
