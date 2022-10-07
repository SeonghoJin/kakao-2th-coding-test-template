import { ApiService } from "./ApiService.js";

export class App {
  private readonly apiService: ApiService;

  constructor({ apiService }) {
    this.apiService = apiService;
  }

  run = async () => {
    await Promise.all([]);
    await Promise.all([]);
    await Promise.all([]);

    const result = await this.apiService.match([]);

    if (result.status === "finished") {
      const score = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };

}
