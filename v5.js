import ApiService from "./ApiService.js";

export class V5 {
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
    const { status } = await this.apiService.simulate([
      { truck_id: 0, command: [] },
    ]);

    if (status === "finished") {
      const { score } = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };
}
