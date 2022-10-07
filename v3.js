import ApiService from "./ApiService.js";

export class V3 {
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
    const [{ game_result }] = await Promise.all([
      this.apiService.getGameResult(),
      this.createUsersMap(),
    ]);

    await this.changeGrade(game_result);
    const matches = await this.matching();

    const result = await this.apiService.match(matches);
    if (result.status === "finished") {
      const { score } = await this.apiService.getScore();
      console.log(score);
      return;
    }

    this.run();
  };

  matching = async () => {
    const { waiting_line } = await this.apiService.getWaitingLine();
    const matches = [];

    const lineWithGrade = waiting_line.map((line) => {
      return {
        ...line,
        grade: this.map[line.id],
      };
    });

    lineWithGrade.sort((a, b) => {
      return a.grade - b.grade;
    });

    console.log(lineWithGrade);

    for (let i = 0; i < lineWithGrade.length; i += 2) {
      if (lineWithGrade[i] != null && lineWithGrade[i + 1] != null) {
        if (lineWithGrade[i + 1].grade - lineWithGrade[i].grade > 1000) {
          i--;
        } else {
          matches.push([lineWithGrade[i].id, lineWithGrade[i + 1].id]);
        }
      }
    }

    return matches;
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
