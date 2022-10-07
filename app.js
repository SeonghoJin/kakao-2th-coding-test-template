import { ApiService } from "./ApiService.js";

export class App {
  /**
   *
   * @param {{
   *  apiService: ApiService
   * }} param
   */
  constructor({ apiService }) {
    this.apiService = apiService;
    this.current = Date.now();
  }

  run = async () => {
    await Promise.all([]);
    await Promise.all([]);
    await Promise.all([]);

    const result = await this.apiService.match([]);
    console.log(Date.now() - this.current);
    console.log(result)
    if (result.status === "finished") {
      const score = await this.apiService.getScore();
      const here = Date.now();
      console.log(here - this.current);
      console.log(score);
      return;
    }

    this.run();
  };

}
