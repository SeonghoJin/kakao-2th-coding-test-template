import { ApiService } from "./ApiService.js";

export class App {
  private readonly apiService: ApiService;
  private readonly current = Date.now();
  constructor({ apiService }) {
    this.apiService = apiService;
  }

  run = async () => {
    await Promise.all([]);
    await Promise.all([]);
    await Promise.all([]);

    const result = await this.apiService.match([]);
    // @ts-ignore
    console.log(Date.now() - this.current)
    // @ts-ignore
    if (result.status === "finished") {
      // @ts-ignore
      console.log(Date.now() - this.current)
      const score = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };

}
