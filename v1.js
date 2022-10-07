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
    const { waiting_line } = await this.apiService.getWaitingLine();
    const { game_result } = await this.apiService.getGameResult();

    console.log(waiting_line);
    const matches = [];

    for (let i = 0; i < waiting_line.length; i += 2) {
      if (waiting_line[i] != null && waiting_line[i + 1] != null) {
        matches.push([waiting_line[i].id, waiting_line[i + 1].id]);
      }
    }

    console.log(matches);

    const result  = await this.apiService.match(matches);
    console.log(result);
    if (result.status === "finished") {
      const { score } = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };
}
