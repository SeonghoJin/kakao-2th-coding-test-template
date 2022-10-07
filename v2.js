import ApiService from "./ApiService.js";

export class V2 {
  /**
   *
   * @param {{
   *  apiService: ApiService
   * }} param
   */
  constructor({ apiService }) {
    this.apiService = apiService;
    this.map = {};
  }

  run = async () => {
    const [{ waiting_line }, { game_result }] = await Promise.all([
      this.apiService.getWaitingLine(),
      this.apiService.getGameResult(),
      this.createUsersMap(),
    ]);

    await this.changeGrade(game_result);
    console.log(this.map);

    const matches = [];

    for (let i = 0; i < waiting_line.length; i += 2) {
      if (waiting_line[i] != null && waiting_line[i + 1] != null) {
        matches.push([waiting_line[i].id, waiting_line[i + 1].id]);
      }
    }

    const result = await this.apiService.match(matches);
    if (result.status === "finished") {
      const { score } = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };

  /**
   *
   * @param {{
   *   taken: number,
   *   winner: {
   *      id: number;
   *      grade: number
   *   },
   *   loser: {
   *    id: number;
   *    grade: number;
   *   }
   * }} result
   */
  createScore = (result) => {
    const { taken } = result;
    const diffGrade = result.winner.grade - result.loser.grade;
    let winCost = 30;
    let loseCost = 30;

    if (diffGrade > 0) {
      winCost -= 5;
      loseCost -= 5;
    } else {
      winCost += 5;
      loseCost += 5;
    }

    if (taken <= 5) {
      winCost += 5;
      loseCost += 5;
    } else {
      winCost -= 5;
      loseCost -= 5;
    }

    return {
      winner: {
        id: result.winner.id,
        winCost,
      },
      loser: {
        id: result.loser.id,
        loseCost,
      },
    };
  };

  /**
   *
   * @param {import("./types").UserInfo[]} users
   */
  createUsersMap = async (users) => {
    const { user_info } = await this.apiService.getUserInfo();

    user_info.forEach((user) => {
      this.map[user.id] = user.grade;
    });
  };

  /**
   *
   * @param {import("./types").GameReuslt[]} results
   */
  changeGrade = async (results) => {
    results
      .map((result) => {
        return {
          taken: result.taken,
          winner: {
            id: result.win,
            grade: this.map[result.win],
          },
          loser: {
            id: result.lose,
            grade: this.map[result.lose],
          },
        };
      })
      .map((item) => this.createScore(item))
      .forEach((item) => {
        this.map[item.loser.id] = Math.max(
          this.map[item.loser.id] - item.loser.loseCost,
          0
        );
        this.map[item.winner.id] = Math.max(
          this.map[item.winner.id] + item.winner.winCost,
          0
        );
      });

    const nextGrade = Object.entries(this.map).map(([key, value]) => {
      return {
        id: key,
        grade: value,
      };
    });

    await this.apiService.changeGrade(nextGrade);
  };
}
