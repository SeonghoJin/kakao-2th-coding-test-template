import ApiService from "./ApiService.js";

export class V1 {
  /**
   *
   * @param {{
   *  apiService: ApiService
   * }} param
   */
  constructor({ apiService }) {
    this.apiService = apiService;
  }

  run = async () => {
    await Promise.all([]);
    await Promise.all([]);
    await Promise.all([]);

    const result = await this.apiService.match(matches);

    if (result.status === "finished") {
      const { score } = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };
}
